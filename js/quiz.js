// 고등학교 1학년 통합과학 '원소의 주기성 탐구 미니 퀴즈' 모듈
// 학생들이 수업 시간에 배운 주기율표 개념을 직접 원소 카드를 클릭하며 재미있게 맞추는 게임형 학습 기능입니다.

const QUIZ_QUESTIONS = [
  {
    targetSymbol: "Na",
    question: "원자 번호 11번이며, 물과 격렬하게 반응하여 수소 기체를 발생시키는 3주기 1족 알칼리 금속은 무엇일까요?",
    hint: "소금(NaCl)을 구성하는 원소 중 하나예요!"
  },
  {
    targetSymbol: "F",
    question: "원자가 전자가 7개이며 반응성이 매우 큰 2주기 17족 할로젠 원소로, 충치 예방 치약에 쓰이는 원소는?",
    hint: "불소라고도 불리며 원자 번호는 9번입니다."
  },
  {
    targetSymbol: "C",
    question: "원자가 전자가 4개로 최대 4개의 공유 결합을 형성할 수 있어, 생명체 유기물의 중심 뼈대를 이루는 원소는?",
    hint: "흑연과 다이아몬드를 이루는 2주기 14족 원소예요."
  },
  {
    targetSymbol: "Ne",
    question: "2주기 18족 비활성 기체로, 최외각 전자 껍질에 전자 8개가 꽉 차 매우 안정하며 화려한 조명 간판에 쓰이는 원소는?",
    hint: "원자 번호는 10번이며 '네온사인'으로 친숙해요."
  },
  {
    targetSymbol: "Mg",
    question: "전자 껍질이 3개(3주기)이고 원자가 전자가 2개이며, 식물의 광합성을 담당하는 엽록소의 중심 원소는?",
    hint: "연소할 때 강렬한 백색 빛을 내는 12번 금속 원소입니다."
  },
  {
    targetSymbol: "Ca",
    question: "4주기 2족 알칼리 토금속으로, 사람의 뼈와 치아를 튼튼하게 만드는 주성분 원소는 무엇일까요?",
    hint: "우유와 멸치에 많이 들어있는 20번 원소예요."
  },
  {
    targetSymbol: "H",
    question: "원자 번호 1번이며 전자 껍질(K껍질)에 전자가 1개뿐인, 우주에서 가장 가볍고 가장 풍부한 원소는?",
    hint: "물(H₂O)을 구성하는 원소이자 청정 연료로 주목받아요."
  },
  {
    targetSymbol: "Si",
    question: "모래와 암석의 주성분이며, 현대 컴퓨터 CPU와 IT 반도체 웨이퍼의 핵심 재료로 쓰이는 3주기 준금속은?",
    hint: "실리콘 밸리의 어원이 된 14번 원소입니다."
  },
  {
    targetSymbol: "Cl",
    question: "3주기 17족 할로젠 원소로, 자극적인 냄새가 나며 수돗물 정수 소독 및 락스에 사용되는 원소는?",
    hint: "원자 번호 17번의 황록색 기체 원소예요."
  },
  {
    targetSymbol: "K",
    question: "바나나에 풍부하고 신경 전달에 필수적인 알칼리 금속으로, 물에 넣으면 보라색 불꽃을 뿜는 4주기 1족 원소는?",
    hint: "포타슘이라고도 불리는 19번 원소입니다."
  }
];

class QuizManager {
  /**
   * 퀴즈 매니저 초기화
   * @param {Object} callbacks - 퀴즈 상태 변경 시 UI를 업데이트할 콜백 함수들
   */
  constructor(callbacks = {}) {
    this.questions = [...QUIZ_QUESTIONS];
    this.currentIndex = 0;
    this.score = 0;
    this.isActive = false;
    this.callbacks = callbacks; // onQuestionChange, onAnswerResult, onQuizComplete
  }

  /**
   * 퀴즈 시작 (질문 순서를 무작위로 섞음)
   */
  startQuiz() {
    this.shuffleQuestions();
    this.currentIndex = 0;
    this.score = 0;
    this.isActive = true;
    this.dispatchQuestion();
  }

  /**
   * 퀴즈 종료 / 취소
   */
  stopQuiz() {
    this.isActive = false;
    if (this.callbacks.onQuizStop) {
      this.callbacks.onQuizStop();
    }
  }

  /**
   * 문제 섞기 (Fisher-Yates 셔플 알고리즘)
   */
  shuffleQuestions() {
    for (let i = this.questions.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.questions[i], this.questions[j]] = [this.questions[j], this.questions[i]];
    }
  }

  /**
   * 현재 문제 정보 전달
   */
  getCurrentQuestion() {
    if (!this.isActive || this.currentIndex >= this.questions.length) return null;
    return {
      ...this.questions[this.currentIndex],
      currentNum: this.currentIndex + 1,
      totalCount: this.questions.length,
      score: this.score
    };
  }

  dispatchQuestion() {
    const qData = this.getCurrentQuestion();
    if (this.callbacks.onQuestionChange && qData) {
      this.callbacks.onQuestionChange(qData);
    }
  }

  /**
   * 학생이 주기율표 원소 카드를 클릭했을 때 정답 검증
   * @param {string} clickedSymbol - 클릭한 원소 기호 (예: 'Na')
   * @returns {boolean} 정답 여부
   */
  checkAnswer(clickedSymbol) {
    if (!this.isActive) return false;

    const currentQ = this.questions[this.currentIndex];
    const isCorrect = (currentQ.targetSymbol === clickedSymbol);

    if (isCorrect) {
      this.score += 10;
    }

    if (this.callbacks.onAnswerResult) {
      this.callbacks.onAnswerResult({
        isCorrect,
        targetSymbol: currentQ.targetSymbol,
        clickedSymbol,
        currentNum: this.currentIndex + 1,
        totalCount: this.questions.length,
        score: this.score
      });
    }

    return isCorrect;
  }

  /**
   * 다음 문제로 넘어가기
   */
  nextQuestion() {
    this.currentIndex++;
    if (this.currentIndex >= this.questions.length) {
      this.isActive = false;
      if (this.callbacks.onQuizComplete) {
        this.callbacks.onQuizComplete({
          score: this.score,
          maxScore: this.questions.length * 10,
          totalCount: this.questions.length
        });
      }
    } else {
      this.dispatchQuestion();
    }
  }
}
