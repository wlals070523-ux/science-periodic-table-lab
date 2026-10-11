// 메인 애플리케이션 컨트롤러
// 주기율표 렌더링, 필터링, 모달 팝업 및 보어 모형 애니메이션 제어

document.addEventListener("DOMContentLoaded", () => {
  // 1. 주요 DOM 엘리먼트 참조
  const periodicTableGrid = document.getElementById("periodic-table-grid");
  const modal = document.getElementById("element-modal");
  const modalCloseBtn = document.getElementById("modal-close-btn");
  const bohrCanvas = document.getElementById("bohr-canvas");
  const filterBtns = document.querySelectorAll(".filter-btn");
  const valenceSelect = document.getElementById("valence-filter-select");
  const searchInput = document.getElementById("search-input");

  // 퀴즈 관련 엘리먼트
  const quizToggleBtn = document.getElementById("quiz-toggle-btn");
  const quizBanner = document.getElementById("quiz-banner");
  const quizQuestionText = document.getElementById("quiz-question-text");
  const quizProgress = document.getElementById("quiz-progress");
  const quizScore = document.getElementById("quiz-score");
  const quizHintBtn = document.getElementById("quiz-hint-btn");
  const quizHintText = document.getElementById("quiz-hint-text");
  const quizExitBtn = document.getElementById("quiz-exit-btn");
  const quizFeedback = document.getElementById("quiz-feedback");

  // 보어 모형 렌더러 인스턴스 생성
  const bohrRenderer = new BohrModelRenderer(bohrCanvas);

  // 현재 필터 상태
  let currentFilter = "all";
  let currentValenceFilter = "all";
  let currentSearchQuery = "";

  // 2. 퀴즈 매니저 초기화
  const quizManager = new QuizManager({
    onQuestionChange: (q) => {
      quizBanner.classList.remove("hidden");
      quizQuestionText.textContent = `Q${q.currentNum}. ${q.question}`;
      quizProgress.textContent = `진행: ${q.currentNum} / ${q.totalCount}`;
      quizScore.textContent = `점수: ${q.score}점`;
      quizHintText.classList.add("hidden");
      quizHintText.textContent = `💡 힌트: ${q.hint}`;
      quizFeedback.textContent = "";
      quizFeedback.className = "quiz-feedback";
    },
    onAnswerResult: ({ isCorrect, targetSymbol, clickedSymbol, currentNum, totalCount, score }) => {
      quizScore.textContent = `점수: ${score}점`;
      const clickedCard = document.querySelector(`.element-card[data-symbol="${clickedSymbol}"]`);

      if (isCorrect) {
        // 정답 시각 피드백
        quizFeedback.textContent = `🎉 정답입니다! (${targetSymbol} 원소)`;
        quizFeedback.className = "quiz-feedback correct";
        if (clickedCard) {
          clickedCard.classList.add("card-correct-anim");
          setTimeout(() => clickedCard.classList.remove("card-correct-anim"), 1000);
        }
        setTimeout(() => {
          quizManager.nextQuestion();
        }, 1200);
      } else {
        // 오답 시각 피드백
        quizFeedback.textContent = `❌ 아쉬워요! ${clickedSymbol} 원소가 아닙니다. 다시 한번 찾아보세요!`;
        quizFeedback.className = "quiz-feedback wrong";
        if (clickedCard) {
          clickedCard.classList.add("card-wrong-anim");
          setTimeout(() => clickedCard.classList.remove("card-wrong-anim"), 600);
        }
      }
    },
    onQuizComplete: ({ score, maxScore }) => {
      quizQuestionText.textContent = `🎊 축하합니다! 퀴즈를 모두 완료했습니다! 최종 점수: ${score}점 / ${maxScore}점`;
      quizHintBtn.classList.add("hidden");
      quizHintText.classList.add("hidden");
      quizFeedback.textContent = score >= 80 ? "훌륭해요! 원소의 주기성을 완벽하게 마스터했군요!" : "잘했어요! 주기율표를 다시 탐구해보면 100점을 받을 수 있어요!";
      quizFeedback.className = "quiz-feedback correct";
      quizToggleBtn.textContent = "🎮 퀴즈 다시 시작";
    },
    onQuizStop: () => {
      quizBanner.classList.add("hidden");
      quizToggleBtn.textContent = "🎮 주기성 퀴즈 시작";
      quizToggleBtn.classList.remove("active");
    }
  });

  // 3. 주기율표 카드 생성 및 배치
  function renderPeriodicTable() {
    periodicTableGrid.innerHTML = "";

    // 족(1~18족) 헤더 라벨 생성
    for (let g = 1; g <= 18; g++) {
      const groupHeader = document.createElement("div");
      groupHeader.className = "group-header-label";
      groupHeader.textContent = `${g}족`;
      groupHeader.style.gridColumn = `${g + 1}`; // 1열은 주기 라벨 자리
      groupHeader.style.gridRow = "1";
      periodicTableGrid.appendChild(groupHeader);
    }

    // 주기(1~4주기) 헤더 라벨 생성
    for (let p = 1; p <= 4; p++) {
      const periodHeader = document.createElement("div");
      periodHeader.className = "period-header-label";
      periodHeader.textContent = `${p}주기`;
      periodHeader.style.gridColumn = "1";
      periodHeader.style.gridRow = `${p + 1}`;
      periodicTableGrid.appendChild(periodHeader);
    }

    // 1~20번 원소 카드 생성
    ELEMENTS_DATA.forEach((elem) => {
      const card = document.createElement("button");
      card.type = "button";
      card.className = `element-card category-${elem.category}`;
      card.dataset.symbol = elem.symbol;
      card.dataset.number = elem.number;
      card.dataset.category = elem.category;
      card.dataset.valence = elem.valenceElectrons;
      card.dataset.period = elem.period;
      card.dataset.group = elem.group;

      // 표준 주기율표 격자 위치 지정 (컬럼: group + 1, 로우: period + 1)
      card.style.gridColumn = `${elem.group + 1}`;
      card.style.gridRow = `${elem.period + 1}`;
      card.style.setProperty("--theme-color", elem.color);

      // 카드 내부 내용 (원자 번호, 기호, 한글 이름, 원자가 전자 배지)
      card.innerHTML = `
        <span class="card-number">${elem.number}</span>
        <span class="card-valence-badge" title="원자가 전자 수">${elem.valenceElectrons}e⁻</span>
        <strong class="card-symbol">${elem.symbol}</strong>
        <span class="card-name">${elem.nameKo}</span>
      `;

      // 카드 클릭 이벤트 핸들러
      card.addEventListener("click", () => {
        if (quizManager.isActive) {
          // 퀴즈 진행 중일 때는 정답 확인
          quizManager.checkAnswer(elem.symbol);
        } else {
          // 일반 모드에서는 원소 상세 정보 모달 열기
          openElementModal(elem);
        }
      });

      periodicTableGrid.appendChild(card);
    });
  }

  // 4. 모달 열기 및 보어 모형 렌더링
  function openElementModal(elem) {
    document.getElementById("modal-symbol").textContent = elem.symbol;
    document.getElementById("modal-name-ko").textContent = elem.nameKo;
    document.getElementById("modal-name-en").textContent = elem.nameEn;
    document.getElementById("modal-number").textContent = `원자 번호 ${elem.number}번`;
    document.getElementById("modal-weight").textContent = elem.weight;
    document.getElementById("modal-category").textContent = elem.categoryName;
    document.getElementById("modal-position").textContent = `${elem.period}주기 ${elem.group}족`;
    document.getElementById("modal-valence").textContent = `${elem.valenceElectrons}개`;
    document.getElementById("modal-shells").textContent = elem.shells.join(" - ") + ` (${elem.shells.length}개 껍질)`;
    document.getElementById("modal-state").textContent = elem.state;
    document.getElementById("modal-description").textContent = elem.description;
    document.getElementById("modal-funfact").textContent = elem.funFact;

    const modalBadge = document.getElementById("modal-category-badge");
    modalBadge.textContent = elem.categoryName;
    modalBadge.style.backgroundColor = elem.color;

    // 모달 표시
    modal.classList.remove("hidden");
    document.body.style.overflow = "hidden"; // 배경 스크롤 방지

    // 보어 원자 모형 애니메이션 시작
    setTimeout(() => {
      bohrRenderer.start(elem);
    }, 50);
  }

  // 5. 모달 닫기
  function closeElementModal() {
    modal.classList.add("hidden");
    document.body.style.overflow = "";
    bohrRenderer.stop(); // 캔버스 애니메이션 정지 (자원 절약)
  }

  modalCloseBtn.addEventListener("click", closeElementModal);
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      closeElementModal();
    }
  });

  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !modal.classList.contains("hidden")) {
      closeElementModal();
    }
  });

  // 6. 필터링 및 검색 로직
  function applyFilters() {
    const cards = document.querySelectorAll(".element-card");

    cards.forEach((card) => {
      const symbol = card.dataset.symbol.toLowerCase();
      const number = card.dataset.number;
      const category = card.dataset.category;
      const valence = card.dataset.valence;
      const name = ELEMENTS_DATA.find(e => e.symbol === card.dataset.symbol)?.nameKo.toLowerCase() || "";

      // 분류 필터 매칭
      let matchesCategory = true;
      if (currentFilter === "all") {
        matchesCategory = true;
      } else if (currentFilter === "metal") {
        matchesCategory = ["alkali-metal", "alkaline-earth", "post-transition"].includes(category);
      } else if (currentFilter === "nonmetal-group") {
        matchesCategory = ["nonmetal", "halogen", "noble-gas"].includes(category);
      } else {
        matchesCategory = (category === currentFilter);
      }

      // 원자가 전자 필터 매칭
      let matchesValence = true;
      if (currentValenceFilter !== "all") {
        matchesValence = (valence === currentValenceFilter);
      }

      // 검색어 매칭
      let matchesSearch = true;
      if (currentSearchQuery.trim() !== "") {
        const query = currentSearchQuery.trim().toLowerCase();
        matchesSearch = symbol.includes(query) || name.includes(query) || number === query;
      }

      // 조건 충족 시 하이라이트, 미충족 시 딤(흐리게) 처리
      if (matchesCategory && matchesValence && matchesSearch) {
        card.classList.remove("dimmed");
        card.classList.add("highlighted");
      } else {
        card.classList.add("dimmed");
        card.classList.remove("highlighted");
      }
    });
  }

  // 분류 필터 버튼 이벤트
  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      currentFilter = btn.dataset.filter;
      applyFilters();
    });
  });

  // 원자가 전자 선택 이벤트
  valenceSelect.addEventListener("change", (e) => {
    currentValenceFilter = e.target.value;
    applyFilters();
  });

  // 실시간 원소 검색 이벤트
  searchInput.addEventListener("input", (e) => {
    currentSearchQuery = e.target.value;
    applyFilters();
  });

  // 7. 퀴즈 컨트롤 버튼 이벤트
  quizToggleBtn.addEventListener("click", () => {
    if (quizManager.isActive) {
      quizManager.stopQuiz();
    } else {
      quizManager.startQuiz();
      quizToggleBtn.textContent = "🛑 퀴즈 종료하기";
      quizToggleBtn.classList.add("active");
    }
  });

  quizExitBtn.addEventListener("click", () => {
    quizManager.stopQuiz();
  });

  quizHintBtn.addEventListener("click", () => {
    quizHintText.classList.toggle("hidden");
  });

  // 초기 주기율표 렌더링 실행
  renderPeriodicTable();
});
