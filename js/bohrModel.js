// 보어 원자 모형(Bohr's Atom Model) 시각화 렌더러
// 원자핵(양성자 수)과 전자 껍질(K, L, M, N), 그리고 궤도를 도는 전자를 실시간 애니메이션으로 표현합니다.

class BohrModelRenderer {
  /**
   * 렌더러 생성자
   * @param {HTMLCanvasElement} canvas - 그림을 그릴 HTML5 캔버스 엘리먼트
   */
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.animationId = null;
    this.currentElement = null;
    this.rotationAngles = [0, 0, 0, 0]; // 각 껍질별 회전 각도 (라디안 단위)
    this.shellNames = ["K (1주기)", "L (2주기)", "M (3주기)", "N (4주기)"];
  }

  /**
   * 특정 원소의 보어 모형 애니메이션 시작
   * @param {Object} elementData - elementsData.js에 정의된 원소 객체
   */
  start(elementData) {
    this.stop(); // 기존 실행 중인 애니메이션 정지
    this.currentElement = elementData;
    this.rotationAngles = [0, 0, 0, 0];

    // 고해상도 디스플레이(레티나) 지원을 위한 캔버스 크기 보정
    this.resizeCanvas();

    const animate = () => {
      // 각 전자 껍질의 궤도 회전 각도 갱신 (서로 다른 방향과 속도로 회전)
      this.rotationAngles[0] += 0.012;  // K껍질 (시계 방향)
      this.rotationAngles[1] -= 0.009;  // L껍질 (반시계 방향)
      this.rotationAngles[2] += 0.007;  // M껍질 (시계 방향)
      this.rotationAngles[3] -= 0.005;  // N껍질 (반시계 방향)

      this.draw();
      this.animationId = requestAnimationFrame(animate);
    };

    animate();
  }

  /**
   * 애니메이션 중지
   */
  stop() {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
      this.animationId = null;
    }
  }

  /**
   * 캔버스 크기 및 해상도 맞춤 설정
   */
  resizeCanvas() {
    const rect = this.canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    this.canvas.width = rect.width * dpr;
    this.canvas.height = rect.height * dpr;
    this.ctx.scale(dpr, dpr);
    this.width = rect.width;
    this.height = rect.height;
  }

  /**
   * 화면 프레임 렌더링
   */
  draw() {
    if (!this.currentElement) return;

    const ctx = this.ctx;
    const centerX = this.width / 2;
    const centerY = this.height / 2;
    const maxRadius = Math.min(centerX, centerY) - 24;

    // 1. 배경 클리어 (잔상 없이 깨끗하게 지우기)
    ctx.clearRect(0, 0, this.width, this.height);

    const shells = this.currentElement.shells; // 전자 배치 배열 예: [2, 8, 1]
    const shellCount = shells.length; // 채워진 전자 껍질 수 (주기 번호)

    // 동심원 껍질 간격 계산
    const baseRadius = 38;
    const radiusStep = (maxRadius - baseRadius) / Math.max(shellCount, 1);

    // 2. 전자 껍질(궤도선) 그리기
    for (let i = 0; i < shellCount; i++) {
      const radius = baseRadius + (i + 1) * radiusStep;
      const isOutermost = (i === shellCount - 1); // 가장 바깥 껍질 여부

      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
      ctx.strokeStyle = isOutermost ? "rgba(99, 179, 237, 0.45)" : "rgba(255, 255, 255, 0.15)";
      ctx.lineWidth = isOutermost ? 1.8 : 1.2;
      ctx.setLineDash(isOutermost ? [4, 4] : []);
      ctx.stroke();
      ctx.setLineDash([]);

      // 껍질 이름 라벨 표시 (K, L, M, N)
      ctx.fillStyle = isOutermost ? "#63b3ed" : "rgba(255, 255, 255, 0.4)";
      ctx.font = "11px Pretendard, sans-serif";
      ctx.textAlign = "left";
      ctx.textBaseline = "middle";
      ctx.fillText(this.shellNames[i] || `껍질 ${i + 1}`, centerX + radius + 4, centerY);
    }

    // 3. 각 껍질의 전자(Electrons) 그리기
    for (let sIdx = 0; sIdx < shellCount; sIdx++) {
      const radius = baseRadius + (sIdx + 1) * radiusStep;
      const electronCount = shells[sIdx];
      const startAngle = this.rotationAngles[sIdx];
      const isOutermost = (sIdx === shellCount - 1);

      for (let eIdx = 0; eIdx < electronCount; eIdx++) {
        // 전자를 원 둘레에 균등한 각도로 배치
        const angle = startAngle + (eIdx * (Math.PI * 2 / electronCount));
        const ex = centerX + Math.cos(angle) * radius;
        const ey = centerY + Math.sin(angle) * radius;

        // 전자 글로우 효과
        ctx.beginPath();
        ctx.arc(ex, ey, isOutermost ? 6.5 : 5, 0, Math.PI * 2);

        // 최외각 전자(화학적 성질을 결정하는 원자가 전자)는 특별한 네온 황금/청록 빛으로 강조
        if (isOutermost) {
          ctx.fillStyle = "#ffd43b"; // 원자가 전자 강조 (노란빛)
          ctx.shadowColor = "#ffd43b";
          ctx.shadowBlur = 10;
        } else {
          ctx.fillStyle = "#63b3ed"; // 안쪽 전자 (푸른빛)
          ctx.shadowColor = "#63b3ed";
          ctx.shadowBlur = 6;
        }
        ctx.fill();
        ctx.shadowBlur = 0; // 그림자 초기화

        // 전자 중앙의 음전하(-) 심볼
        ctx.fillStyle = "#1a202c";
        ctx.font = "bold 9px sans-serif";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText("−", ex, ey);
      }
    }

    // 4. 중심 원자핵(Atomic Nucleus) 그리기
    const nucleusRadius = 26;

    // 원자핵 후광(Glow) 효과
    const grad = ctx.createRadialGradient(centerX, centerY, 4, centerX, centerY, nucleusRadius + 8);
    grad.addColorStop(0, "rgba(240, 101, 149, 0.95)");
    grad.addColorStop(0.7, "rgba(230, 73, 128, 0.7)");
    grad.addColorStop(1, "rgba(194, 37, 92, 0)");

    ctx.beginPath();
    ctx.arc(centerX, centerY, nucleusRadius + 8, 0, Math.PI * 2);
    ctx.fillStyle = grad;
    ctx.fill();

    // 원자핵 중심 구
    ctx.beginPath();
    ctx.arc(centerX, centerY, nucleusRadius, 0, Math.PI * 2);
    ctx.fillStyle = "#e64980";
    ctx.fill();
    ctx.strokeStyle = "#ffdeeb";
    ctx.lineWidth = 1.5;
    ctx.stroke();

    // 원자핵 텍스트: 양전하 원자 번호 (+번호) 및 원소 기호
    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 13px Pretendard, sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(`+${this.currentElement.number}`, centerX, centerY - 6);

    ctx.font = "bold 11px Pretendard, sans-serif";
    ctx.fillStyle = "#ffe3e3";
    ctx.fillText(this.currentElement.symbol, centerX, centerY + 8);
  }
}
