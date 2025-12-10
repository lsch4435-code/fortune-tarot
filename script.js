document.addEventListener("DOMContentLoaded", function () {
  const pageType = document.body.dataset.page || "menu";

  // 메인 메뉴(index)는 JS 필요 없음
  if (pageType === "menu") return;

  const nameInput = document.getElementById("nameInput");
  const moodSelect = document.getElementById("moodSelect");
  const ageInput = document.getElementById("ageInput");
  const zodiacSelect = document.getElementById("zodiacSelect");
  const birthYearInput = document.getElementById("birthYearInput");

  const fortuneBtn = document.getElementById("fortuneBtn");
  const resultCard = document.getElementById("resultCard");
  const resultText = document.getElementById("resultText");
  const resultHint = document.getElementById("resultHint");

  if (!fortuneBtn) return;

  // ------------------------------
  // 1. 운세 문장들
  // ------------------------------

  const loveFortunes = [
    "{name}님, 오늘은 예상 못 한 사람에게서 {mood} 마음을 느낄 수 있어요. 작은 대화가 인연의 시작이 될지도 몰라요. 💕",
    "평소와 비슷한 하루 같지만, {name}님의 따뜻한 한 마디가 누군가의 심장을 살짝 흔들 거예요. 솔직한 말 한마디가 큰 용기가 될 수 있어요. 💌",
    "{mood} 에너지가 주변으로 퍼지는 날이에요. {name}님의 웃는 얼굴만으로도 누군가에겐 설레는 순간이 될 거예요. ✨",
    "기대하지 않았던 연락이나 DM이 올 수 있는 날이에요. {name}님이 먼저 가볍게 안부를 물어봐도 좋아요. 대화의 물꼬를 여는 건 좋은 선택! 📱",
    "답장이 느리다고 해서 마음이 없는 건 아닐 거예요. {name}님의 매력은 천천히 스며드는 타입. 여유 있게 기다려 보는 것도 연애 운을 올려줘요. 🌙",
    "오늘은 {name}님의 솔직함이 가장 큰 매력이에요. 돌려 말하기보다는, 적당히 진심을 담은 표현이 상대의 마음을 누를 거예요. 🔓",
    "{name}님 주변 가까운 사람들 속에 이미 눈여겨보는 사람이 있을지도 몰라요. 친구에서 연인으로 발전할 기운이 살짝 보이는 날이에요. 🌸",
    "연락만 기다리지 말고, {name}님이 먼저 말 걸어보는 것도 좋아요. 가벼운 이모티콘 하나가 분위기를 따뜻하게 바꿔 줄 수 있어요. 🫶",
    "오늘은 {name}님이 스스로를 사랑할수록 연애 운도 함께 올라가는 날이에요. 맛있는 거 하나라도 자신에게 선물해 보세요. 🍰",
    "{mood} 상태라면, 귀엽게 투정 한 번 부려 보는 것도 괜찮아요. {name}님의 솔직한 모습에 상대도 더 마음을 열 수 있어요. 😌",
    "예상치 못한 곳에서 시선이 마주치는 순간이 생길 수 있어요. {name}님의 사소한 행동 하나가 누군가에겐 계속 떠오르는 장면이 될 거예요. 🌟",
    "오늘은 과거의 인연보다 새로운 인연 쪽에 운이 더 강하게 들어와 있어요. {name}님이 한 번도 해보지 않았던 선택을 해 보는 것도 좋겠어요. 🌈"
  ];

  const dailyFortunes = [
    "{name}님의 오늘 하루는 전반적으로 {mood} 흐름이에요. 너무 조급해하지 말고, 내 속도대로 움직이면 좋은 결과가 따라올 거예요. 🌈",
    "작은 선택 하나가 생각보다 크게 돌아오는 날이에요. {name}님이 진짜 하고 싶은 방향 쪽으로 한 걸음 내딛어 보세요. 🚶‍♀️",
    "컨디션이 조금 애매하더라도, {name}님이 했던 노력들이 서서히 쌓여 가는 시기예요. 오늘은 적당히만 해도 충분히 잘하고 있는 거예요. ⭐",
    "오늘은 {name}님의 집중력이 평소보다 좋아지는 운이에요. 과제나 공부를 조금만 밀어붙이면 성취감을 느낄 수 있어요. 📚",
    "마음이 살짝 흔들리는 일이 있을 수 있지만, 그 과정에서 {name}님이 진짜 원하는 게 뭔지 더 분명해질 거예요. 🌱",
    "예상 못 한 사람에게서 도움이나 위로의 말을 들을 수 있는 날이에요. {name}님이 평소에 베풀었던 것들이 천천히 돌아오는 중일지도 몰라요. 🤝",
    "오늘은 완벽함보다는 지속함이 더 중요해요. 조금씩이라도 움직인다면 {name}님의 내일은 분명 더 가벼워질 거예요. ⏳",
    "{name}님이 평소에 별생각 없이 한 행동이 누군가에게 좋은 영향을 줄 수 있는 날이에요. 사소한 친절이 큰 힘이 됩니다. 💬",
    "기대했던 일에서 결과가 조금 늦게 나올 수 있지만, 흐름은 나쁘지 않아요. {name}님이 포기하지 않는다면 좋은 방향으로 흘러갈 운이에요. 🌊",
    "오늘은 혼자만의 시간이 은근히 도움이 되는 날이에요. 짧은 산책이나 카페에서의 휴식이 {name}님의 머릿속을 정리해 줄 거예요. ☕",
    "생각보다 몸과 마음이 지쳐 있을 수 있어요. {name}님이 스스로에게 너그러워질수록 컨디션도 회복 속도가 빨라질 거예요. 💤",
    "오늘 일어난 일들을 짧게 메모해 두면, 나중에 {name}님이 성장한 걸 확인하는 데 큰 도움이 될 거예요. ✍️"
  ];

  const zodiacFortunes = [
    "{sign}인 {name}님, 오늘은 자신감이 빛나는 날이에요. 하고 싶은 말을 조금 더 용기 내서 꺼내 보세요. 사람들에게 강한 인상을 남길 수 있어요. 💫",
    "{sign}의 안정적인 에너지가 도와주는 날이에요. {name}님이 꾸준히 해 온 것들이 서서히 인정받기 시작할 거예요. 🌿",
    "{sign}인 {name}님은 오늘 유난히 감이 좋은 편이에요. 첫 느낌이 괜히 느껴지는 게 아니니, 직감도 한 번 믿어 봐도 좋아요. 🔮",
    "{sign}의 장점인 집중력과 책임감이 빛을 발하는 날이에요. 한 번 시작한 일은 끝까지 밀어붙이면 좋은 결과로 이어질 거예요. 📌",
    "오늘 {sign}인 {name}님은 사람들과의 대화 속에서 힌트를 많이 얻게 돼요. 가볍게 나눈 이야기 속에 필요한 메시지가 숨어 있을지도 몰라요. 💬",
    "{sign}의 매력인 따뜻함이 잘 드러나는 하루예요. {name}님이 주변 사람들에게 건네는 말 한마디가 큰 위로가 될 수 있어요. 🤍",
    "새로운 계획을 세우기 좋은 날이에요. {sign}인 {name}님이 머릿속에만 두었던 생각들을 조금씩 현실로 옮겨 봐도 좋아요. 🧭",
    "{sign}의 특유의 센스와 유머가 돋보이는 날이에요. 사람들 사이에서 {name}님이 분위기 메이커 역할을 하게 될지도 몰라요. 😄",
    "오늘 {sign}인 {name}님은 평소보다 감성이 풍부해질 수 있어요. 음악이나 글, 그림 같은 감성적인 활동을 해 보면 마음이 편해질 거예요. 🎧",
    "{sign}의 균형 감각이 강해지는 날이에요. {name}님이 고민했던 선택지 사이에서, 어느 정도 답이 스스로 정리되는 느낌을 받을 수 있어요. ⚖️",
    "오늘은 {sign}인 {name}님에게 작은 변화를 주기 좋은 날이에요. 머리 스타일이나 옷 스타일을 살짝 바꿔 보면 기분 전환에 도움이 될 거예요. 👗",
    "생각보다 운이 조용히 {name}님 편을 들어주는 날이에요. {sign}의 여유로운 에너지를 믿고, 너무 걱정하지 말고 하루를 흘려보내도 괜찮아요. 🌙"
  ];

  const sajuFortunes = [
    "{animal}인 {name}님은 오늘 사람 운이 괜찮은 날이에요. 혼자 끙끙대기보다는 주변에 살짝 도움을 요청해 보세요. 의외로 쉽게 해결될 수 있어요. 🤝",
    "{animal}의 끈기 있는 기운이 강하게 들어오는 날이에요. {name}님이 포기하지 않는 한, 느리더라도 꾸준히 앞으로 나아가게 될 거예요. 🐾",
    "오늘은 {animal}인 {name}님에게 정리의 기운이 들어와 있어요. 책상, 폴더, 메모 하나만 정리해도 머릿속이 훨씬 가벼워질 거예요. 🧹",
    "{animal}의 장점인 집중력이 발휘되는 날이에요. 해야 할 일을 먼저 처리해 두면, 나머지 시간은 여유롭게 쓸 수 있을 거예요. ⏰",
    "생각보다 운이 조용하게 {name}님을 지켜 주는 날이에요. 큰 변화는 없지만, 큰 문제도 없는 안정적인 흐름이에요. 이런 날엔 휴식을 챙기는 게 좋아요. 🌤️",
    "{animal}인 {name}님은 오늘 직감이 좋은 편이에요. 사람과 관련된 선택에서는 머리보다는 마음이 편한 쪽을 한 번 골라 보세요. 🧠💖",
    "과거 일을 괜히 곱씹게 될 수 있는 날이에요. 하지만 {animal}의 성실한 기운 덕분에, {name}님은 같은 실수를 반복하지 않을 거예요. 경험이 곧 자산이 됩니다. 📚",
    "오늘은 {animal}인 {name}님이 어울리는 사람과 어울릴수록 운이 올라가는 날이에요. 편안한 사람을 만나거나, 좋아하는 사람과 연락해 보세요. 📱",
    "{animal} 특유의 에너지 덕분에, 평소보다 체력과 회복력이 좋아질 수 있어요. 짧은 산책이나 가벼운 운동도 {name}님에게 큰 도움이 될 거예요. 🏃‍♀️",
    "사소한 지출이 조금 늘어날 수 있는 날이에요. 다만 {name}님에게 진짜 필요한 것인지 한 번만 더 생각하고 쓰면 괜찮아요. 💸",
    "{animal}인 {name}님은 오늘 유난히 감정 기복이 생길 수 있어요. 잠깐 숨 고르기만 잘 해도 흐름이 훨씬 부드러워질 거예요. 🌬️",
    "오늘은 새로운 걸 무리해서 시작하기보다는, {name}님이 이미 하고 있는 것들을 조금만 더 다듬는 데 운이 들어와 있어요. 마무리에 신경 써 보세요. 🎀"
  ];

  // 재물운
  const moneyFortunes = [
    "{name}님의 오늘 재물운은 {mood} 흐름이에요. 크게 들어오는 돈보다는, 새어 나가는 돈을 잘 막는 게 핵심이에요. 💰",
    "작은 수입이나 알바, 용돈, 급여 중에서 예상 못 한 부분이 생길 수 있어요. {name}님이 했던 노력이 조금은 숫자로 보일 수 있는 날이에요.",
    "오늘은 지출을 정리해 보면 좋은 날이에요. {name}님이 평소에 어디에 돈을 많이 쓰는지 한 번 정리해 보면, 다음 달이 훨씬 편해질 거예요.",
    "크게 쓰기보다는, 필요한 곳에만 깔끔하게 쓰는 게 재물운을 올려줘요. {name}님에게 진짜 필요한 지출인지 한 번 더 생각해 보면 좋아요.",
    "지금 하는 공부나 일, 포트폴리오가 나중에 돈으로 돌아올 가능성이 높아지는 흐름이에요. 오늘 조금만 더 집중해 보세요.",
    "오늘은 '공짜'나 '할인'이라는 말에 혹해서 충동구매를 하기 쉽지만, {name}님이 진짜 원하던 물건인지 확인해 보면 좋아요.",
    "갑작스러운 지출이 생길 수 있지만, 미리 대비하려는 마음가짐만으로도 피해를 줄일 수 있어요. 지갑보다 머리를 먼저 여는 날이에요.",
    "재물운 자체는 나쁘지 않지만, {name}님의 컨디션이 지쳐 있다면 쓸데없는 쇼핑으로 스트레스를 풀 수 있어요. 다른 방법을 먼저 찾아보면 좋아요.",
    "오늘은 사소한 절약이 쌓이면 나중에 꽤 의미 있는 금액이 될 수 있는 흐름이에요. 간단한 다이어트처럼, '돈 다이어트'도 시작해 보기 좋을지도요.",
    "주변 사람과 돈 얘기를 할 때는 특히 조심해야 해요. 농담으로 던진 말도 오해를 부를 수 있는 날이라, 정리를 분명하게 해 두는 게 좋아요.",
    "지금 갖고 싶은 것보다, 앞으로 꼭 필요한 걸 생각하는 사람이 결국 더 큰 재물운을 가져가요. 오늘 잠깐이라도 그 미래를 상상해 보세요.",
    "오늘은 {name}님이 돈을 어디에 쓰느냐에 따라, 하루의 만족도가 달라지는 날이에요. 나를 위해 쓰는 지출이라면, 그만큼 마음에도 투자해 주세요."
  ];

  // 힌트
  const loveHints = [
    "💡 너무 과하게 티내기보다는, 작은 관심 표현부터 시작해 보는 건 어떨까요?",
    "💡 연락 타이밍에 너무 집착하지 말기! 나만의 루틴을 지키는 사람이 더 매력적으로 보일 때가 많아요.",
    "💡 오늘은 내 매력 포인트 하나만 더 살려보기. 헤어/향수/패션 중 하나라도 신경 써보면 좋아요.",
    "💡 상대의 반응에만 집중하기보다는, 내가 진짜 원하는 관계가 뭔지도 한 번 떠올려 보세요.",
    "💡 답장이 늦어도 나까지 함께 무너질 필요는 없어요. 연애도 결국은 나를 아끼는 마음에서 시작돼요."
  ];

  const dailyHints = [
    "💡 오늘 해야 할 일 중 하나만 확실하게 끝내도, 충분히 잘한 하루예요.",
    "💡 컨디션이 애매하면, 작은 휴식이나 간식으로 나를 먼저 챙겨보세요.",
    "💡 비교보다는 기록! 오늘 느낀 감정을 한 줄이라도 메모해보면 좋을 것 같아요.",
    "💡 너무 완벽하려고 하기보다는, 적당히만 해도 괜찮다고 생각해 보세요.",
    "💡 하기 싫은 일은 5분만 해 보기. 시작이 되면 생각보다 더 오래 할 수 있을 거예요."
  ];

  const zodiacHints = [
    "💡 별자리는 재미로 가볍게 참고만 하고, 결국 내 선택이 가장 중요해요.",
    "💡 오늘 별자리 운세를 계기로, 나의 장단점을 한 번 정리해 보는 것도 좋아요.",
    "💡 별자리 성향이랑 다르게 행동해도 괜찮아요. {name}님만의 스타일이 더 중요하니까요.",
    "💡 운세가 좋다고 해서 억지로 뭔가를 만들 필요는 없어요. 편안한 흐름 속에서 기회를 캐치해 보세요."
  ];

  const sajuHints = [
    "💡 띠 운세는 재미로만 보고, 너무 진지하게 받아들이지 않는 게 좋아요.",
    "💡 올해 나에게 필요한 건 뭔지 한 번 적어 보면서, 스스로의 '운'을 만들어 보세요.",
    "💡 힘든 날엔 운세보다도, 충분한 휴식과 따뜻한 말 한마디가 더 큰 힘이 돼요.",
    "💡 과거 탓, 운 탓보다는 오늘 내가 할 수 있는 작은 선택 하나에 집중해 보세요."
  ];

  const moneyHints = [
    "💡 오늘 쓴 돈을 간단히 적어 두면, 내 소비 패턴을 이해하는 데 큰 도움이 돼요.",
    "💡 '진짜 필요한가?' 한 번만 더 물어보고 계산하기, 이 습관이 재물운을 지켜줘요.",
    "💡 하고 싶은 공부나 경험에 쓰는 돈은, 나중에 더 큰 재물운으로 돌아올 수 있어요.",
    "💡 충동구매 대신 위시리스트에 먼저 적어두기만 해도, 지출을 꽤 줄일 수 있어요."
  ];

  // 주의용 문장들
  const loveCautions = [
    "⚠ 오늘은 특히 조급한 마음으로 상대를 몰아붙이면 분위기가 금방 싸늘해질 수 있어요. 한 번 더 생각하고 말해 보세요.",
    "⚠ 사소한 말도 오해로 번지기 쉬운 날이에요. {name}님이 먼저 감정을 가라앉히고 천천히 이야기해 보는 게 좋아요.",
    "⚠ 연락 빈도나 답장 속도에 너무 집착하면 스스로만 지칠 수 있어요. 오늘은 한 발 물러서서 여유를 가지는 편이 좋아요.",
    "⚠ 상대의 반응을 시험해 보려는 행동은 피하는 게 좋아요. 가볍게 웃고 넘길 수 있는 선에서만 표현해 보는 게 안전해요."
  ];

  const dailyCautions = [
    "⚠ 오늘은 멀티태스킹보다는 실수하지 않도록 한 가지씩 처리하는 게 좋아요.",
    "⚠ 피곤한 상태에서 무리해서 버티면 컨디션이 더 안 좋아질 수 있어요. 쉴 수 있을 때는 과감히 쉬어 주세요.",
    "⚠ 감정이 올라왔을 때 바로 메시지나 말로 터뜨리면 후회가 남을 수 있어요. 한 번 더 읽어 보고 보내도 늦지 않아요.",
    "⚠ 중요한 약속 시간이나 마감 기한은 오늘 꼭 두 번 이상 확인해 두는 게 안전해요."
  ];

  const zodiacCautions = [
    "⚠ 별자리 운이 애매한 날이라, '에이 괜찮겠지' 하고 대충 넘기면 작은 실수가 커질 수 있어요.",
    "⚠ 자기 별자리 성향만 믿고 너무 밀어붙이면 주변과 갈등이 생길 수 있어요. 오늘은 한 번 더 조율해 보는 게 좋아요.",
    "⚠ 분위기에 휩쓸린 충동적인 결정은 피하는 게 좋아요. 특히 돈, 인간관계, 시험 관련 결정은 신중하게요."
  ];

  const sajuCautions = [
    "⚠ 오늘은 띠 운이 살짝 약한 날이라, 새로운 도전보다는 지금 하고 있는 걸 정리하는 쪽이 더 잘 맞아요.",
    "⚠ 감정적으로 욱하는 순간에 선택을 하면 후회가 남을 수 있어요. 잠깐 자리에서 벗어나 마음을 가라앉힌 뒤 결정해 보세요.",
    "⚠ 남들 운세와 비교하면서 초조해할 필요는 없어요. 다만 오늘만큼은 중요한 일정을 두 번 세 번 확인해 두면 좋겠어요."
  ];

  const moneyCautions = [
    "⚠ 오늘은 특히 충동구매를 조심해야 하는 날이에요. 지갑을 열기 전에 한 번만 더 생각해 보세요.",
    "⚠ 친구나 연인과 돈 얘기가 오갈 땐 농담이라도 선을 넘지 않는 게 좋아요. 작은 말에서 오해가 생길 수 있어요.",
    "⚠ 기분이 다운됐다고 해서 카드부터 꺼내 들면 나중에 더 힘들어질 수 있어요. 돈 대신 다른 방법으로 스트레스를 풀어 보세요."
  ];

  // ------------------------------
  // 2. 점수용 유틸
  // ------------------------------

  const moodInfoMap = {
    "행복한": {
      scoreDelta: 15,
      advice: "이 좋은 기분을 주변 사람들과 조금만 나누면, 인연과 기회가 같이 따라올 거예요."
    },
    "설레는": {
      scoreDelta: 10,
      advice: "설레는 마음을 숨기지 말고, 작은 행동으로 표현해 보세요."
    },
    "평온한": {
      scoreDelta: 0,
      advice: "지금의 평온함을 유지하는 것만으로도 오늘 하루는 충분히 안정적이에요."
    },
    "피곤한": {
      scoreDelta: -8,
      advice: "무리해서 더 하려 하기보다는, 조금 덜 해도 괜찮다고 스스로를 다독여 주세요."
    },
    "살짝 우울한": {
      scoreDelta: -10,
      advice: "오늘은 혼자 버티려 하기보다, 편한 사람과 소소한 대화를 나누면 도움이 될 거예요."
    }
  };

  function getMoodInfo(mood) {
    return moodInfoMap[mood] || {
      scoreDelta: 0,
      advice: "오늘은 내 페이스를 지키는 것이 중요해요."
    };
  }

  function getZodiacInfo(zodiac) {
    if (!zodiac) {
      return {
        scoreDelta: 0,
        label: "비밀 별자리",
        trait: "어디로 흐를지 모르는 자유로운 에너지"
      };
    }

    const fire = ["양자리", "사자자리", "사수자리"];
    const earth = ["황소자리", "처녀자리", "염소자리"];
    const air = ["쌍둥이자리", "천칭자리", "물병자리"];
    const water = ["게자리", "전갈자리", "물고기자리"];

    let scoreDelta = 0;
    let label = "";
    let trait = "";

    if (fire.includes(zodiac)) {
      scoreDelta = 7;
      label = "불의 별자리";
      trait = "직진력과 열정이 살아나는";
    } else if (earth.includes(zodiac)) {
      scoreDelta = 4;
      label = "흙의 별자리";
      trait = "꾸준함과 현실 감각이 좋아지는";
    } else if (air.includes(zodiac)) {
      scoreDelta = 5;
      label = "공기의 별자리";
      trait = "아이디어와 소통 운이 좋아지는";
    } else if (water.includes(zodiac)) {
      scoreDelta = 6;
      label = "물의 별자리";
      trait = "감수성과 공감 능력이 깊어지는";
    } else {
      scoreDelta = 0;
      label = "비밀 별자리";
      trait = "묘하게 특별한";
    }

    return { scoreDelta, label, trait };
  }

  function getAnimalInfo(year) {
    if (!year || isNaN(year)) {
      return {
        animal: "알 수 없는 띠",
        scoreDelta: 0,
        trait: "방향이 자유로운"
      };
    }

    const animals = [
      "쥐띠",
      "소띠",
      "호랑이띠",
      "토끼띠",
      "용띠",
      "뱀띠",
      "말띠",
      "양띠",
      "원숭이띠",
      "닭띠",
      "개띠",
      "돼지띠"
    ];

    const index = (year - 2008) % 12;
    const fixedIndex = (index + 12) % 12;
    const animal = animals[fixedIndex];

    let scoreDelta = 0;
    let trait = "";

    switch (animal) {
      case "쥐띠":
        trait = "센스와 순발력이 잘 살아나는";
        scoreDelta = 3;
        break;
      case "소띠":
        trait = "차분히 밀어붙이는 힘이 강해지는";
        scoreDelta = 2;
        break;
      case "호랑이띠":
        trait = "대담함과 추진력이 올라가는";
        scoreDelta = 5;
        break;
      case "토끼띠":
        trait = "부드럽게 상황을 조율할 수 있는";
        scoreDelta = 2;
        break;
      case "용띠":
        trait = "존재감과 카리스마가 드러나는";
        scoreDelta = 6;
        break;
      case "뱀띠":
        trait = "분석력과 집중력이 좋아지는";
        scoreDelta = 3;
        break;
      case "말띠":
        trait = "활동성과 사교성이 올라가는";
        scoreDelta = 4;
        break;
      case "양띠":
        trait = "배려심과 따뜻함이 더해지는";
        scoreDelta = 3;
        break;
      case "원숭이띠":
        trait = "재치와 유머감각이 살아나는";
        scoreDelta = 4;
        break;
      case "닭띠":
        trait = "부지런함과 성실함이 돋보이는";
        scoreDelta = 3;
        break;
      case "개띠":
        trait = "신뢰와 의리가 빛나는";
        scoreDelta = 3;
        break;
      case "돼지띠":
        trait = "여유와 복이 들어오는";
        scoreDelta = 5;
        break;
      default:
        trait = "방향이 자유로운";
        scoreDelta = 0;
    }

    return { animal, scoreDelta, trait };
  }

  function getAgeInfo(age) {
    if (!age || isNaN(age)) {
      return {
        label: "비밀 연령대",
        scoreDelta: 0,
        loveLine:
          "지금 {name}님에게 가장 편안한 관계가 무엇인지 생각해 보는 것만으로도 연애 운이 조금 더 정리될 거예요.",
        dailyLine:
          "현재 삶에서 제일 중요한 영역 하나를 골라, 그 부분에 이 운세를 가볍게 적용해 보세요."
      };
    }

    if (age <= 18) {
      return {
        label: "학생",
        scoreDelta: 2,
        loveLine:
          "연애 감정은 학교나 학원, 동아리처럼 일상 속에서 자연스럽게 싹틀 가능성이 있어요.",
        dailyLine:
          "공부나 시험 준비 쪽에서 작은 성취를 노려볼 수 있는 날이에요."
      };
    } else if (age <= 24) {
      return {
        label: "대학생/취준",
        scoreDelta: 3,
        loveLine:
          "캠퍼스, 동아리, 알바 자리 등에서 자연스럽게 인연이 스며들 수 있는 시기예요.",
        dailyLine:
          "학업과 진로, 포트폴리오 준비를 정리해 보기 좋은 흐름이에요."
      };
    } else if (age <= 34) {
      return {
        label: "사회초년생/취준",
        scoreDelta: 1,
        loveLine:
          "직장, 스터디, 취업 준비 과정에서 만나는 사람들 속에 인연의 기운이 숨어 있어요.",
        dailyLine:
          "업무, 취업 준비, 커리어 계획을 차분히 점검하면 도움이 되는 날이에요."
      };
    } else if (age <= 49) {
      return {
        label: "직장인/가족",
        scoreDelta: 0,
        loveLine:
          "일과 가족, 인간관계 사이에서 균형을 잡을수록 마음이 편안해지는 연애 운이에요.",
        dailyLine:
          "직장과 가정 사이의 균형을 조절하는 데 운이 들어와 있어요."
      };
    } else {
      return {
        label: "경험 많은 어른",
        scoreDelta: 0,
        loveLine:
          "연애도 좋지만, 나를 진심으로 편안하게 해 주는 관계를 중심에 두면 좋아요.",
        dailyLine:
          "건강과 여유, 오랫동안 함께할 사람들과의 시간이 특히 중요해지는 흐름이에요."
      };
    }
  }

  function calcScore(type, moodInfo, zodiacInfo, animalInfo, ageInfo) {
    let score =
      50 +
      (moodInfo.scoreDelta || 0) +
      (zodiacInfo.scoreDelta || 0) +
      (animalInfo.scoreDelta || 0) +
      (ageInfo.scoreDelta || 0);

    if (type === "love") score += 3;
    else if (type === "zodiac") score += 2;
    else if (type === "saju") score += 1;
    else if (type === "money") score += 2;

    const randomDelta = Math.floor(Math.random() * 21) - 10; // -10 ~ +10
    score += randomDelta;

    if (score < 0) score = 0;
    if (score > 100) score = 100;

    return Math.round(score);
  }

  function getLevel(score) {
    if (score >= 75) return "good";
    if (score >= 45) return "normal";
    return "low";
  }

  const levelLabelMap = {
    good: "상승세",
    normal: "무난",
    low: "주의"
  };

  function pickRandom(arr) {
    const index = Math.floor(Math.random() * arr.length);
    return arr[index];
  }

  function pickFortuneByLevel(list, level) {
    const size = list.length;
    if (size === 0) return "";

    const chunk = Math.floor(size / 3) || 1;
    let start = 0;
    let end = size;

    if (level === "good") {
      start = 0;
      end = chunk;
    } else if (level === "normal") {
      start = chunk;
      end = chunk * 2;
    } else {
      start = chunk * 2;
      end = size;
    }

    const subset = list.slice(start, end);
    return pickRandom(subset);
  }

  // ------------------------------
  // 3. 버튼 클릭 시 운세 생성
  // ------------------------------

  fortuneBtn.addEventListener("click", function () {
    let name = nameInput.value.trim();
    const mood = moodSelect.value;
    const zodiac = zodiacSelect ? zodiacSelect.value : "";
    const birthYearRaw = birthYearInput ? birthYearInput.value.trim() : "";
    const birthYear = birthYearRaw === "" ? null : Number(birthYearRaw);
    const ageRaw = ageInput ? ageInput.value.trim() : "";
    const age = ageRaw === "" ? null : Number(ageRaw);

    if (name === "") {
      name = "익명의 누군가";
    }

    const type = pageType; // daily / love / money / zodiac / saju

    const moodInfo = getMoodInfo(mood);
    const zodiacInfo = getZodiacInfo(zodiac);
    const animalInfo = getAnimalInfo(birthYear);
    const ageInfo = getAgeInfo(age);

    const score = calcScore(type, moodInfo, zodiacInfo, animalInfo, ageInfo);
    const level = getLevel(score);
    const levelLabel = levelLabelMap[level];
    const ageLabelText = ageInfo.label ? " · " + ageInfo.label : "";

    let fortuneText = "";
    let hintText = "";

    if (type === "love") {
      const template = pickFortuneByLevel(loveFortunes, level);
      const body = template
        .replace(/{name}/g, name)
        .replace(/{mood}/g, mood);
      const ageLoveLine = ageInfo.loveLine
        ? " " + ageInfo.loveLine.replace(/{name}/g, name)
        : "";
      fortuneText = `[연애 운세 ${score}점 · ${levelLabel}${ageLabelText}] ${body}${ageLoveLine}`;
      hintText = pickRandom(loveHints);
      if (moodInfo.advice) {
        hintText += " " + moodInfo.advice;
      }
      if (level === "low") {
        let caution = pickRandom(loveCautions).replace(/{name}/g, name);
        fortuneText += " " + caution;
      }
    } else if (type === "daily") {
      const template = pickFortuneByLevel(dailyFortunes, level);
      const body = template
        .replace(/{name}/g, name)
        .replace(/{mood}/g, mood);
      const ageDailyLine = ageInfo.dailyLine
        ? " " + ageInfo.dailyLine.replace(/{name}/g, name)
        : "";
      fortuneText = `[오늘의 운세 ${score}점 · ${levelLabel}${ageLabelText}] ${body}`;
      hintText = pickRandom(dailyHints);
      if (moodInfo.advice) {
        hintText += " " + moodInfo.advice;
      }
      hintText += ageDailyLine;
      if (level === "low") {
        const caution = pickRandom(dailyCautions);
        fortuneText += " " + caution;
      }
    } else if (type === "zodiac") {
      const sign = zodiac || "비밀 별자리";
      const template = pickFortuneByLevel(zodiacFortunes, level);
      const body = template
        .replace(/{name}/g, name)
        .replace(/{sign}/g, sign);
      const ageDailyLine = ageInfo.dailyLine
        ? " " + ageInfo.dailyLine.replace(/{name}/g, name)
        : "";
      fortuneText = `[별자리 운세 ${score}점 · ${levelLabel}${ageLabelText}] ${body}`;
      let hintTemplate = pickRandom(zodiacHints);
      hintText = hintTemplate
        .replace(/{name}/g, name)
        .replace(/{sign}/g, sign);
      hintText +=
        " 오늘은 " + zodiacInfo.trait + " 흐름을 가볍게 믿어 봐도 좋아요.";
      hintText += ageDailyLine;
      if (level === "low") {
        const caution = pickRandom(zodiacCautions);
        fortuneText += " " + caution;
      }
    } else if (type === "saju") {
      const template = pickFortuneByLevel(sajuFortunes, level);
      const body = template
        .replace(/{name}/g, name)
        .replace(/{animal}/g, animalInfo.animal);
      const ageDailyLine = ageInfo.dailyLine
        ? " " + ageInfo.dailyLine.replace(/{name}/g, name)
        : "";
      fortuneText = `[사주(띠) 운세 ${score}점 · ${levelLabel}${ageLabelText}] ${body}`;
      hintText = pickRandom(sajuHints);
      hintText +=
        " 오늘은 " +
        animalInfo.trait +
        " 에너지가 도와준다고 생각하고 움직여 보세요.";
      hintText += ageDailyLine;
      if (level === "low") {
        const caution = pickRandom(sajuCautions);
        fortuneText += " " + caution;
      }
    } else if (type === "money") {
      const template = pickFortuneByLevel(moneyFortunes, level);
      const body = template
        .replace(/{name}/g, name)
        .replace(/{mood}/g, mood);
      const ageDailyLine = ageInfo.dailyLine
        ? " " + ageInfo.dailyLine.replace(/{name}/g, name)
        : "";
      fortuneText = `[재물 운세 ${score}점 · ${levelLabel}${ageLabelText}] ${body}`;
      hintText = pickRandom(moneyHints);
      hintText += " " + (moodInfo.advice || "");
      hintText += ageDailyLine;
      if (level === "low") {
        const caution = pickRandom(moneyCautions);
        fortuneText += " " + caution;
      }
    }

    resultText.textContent = fortuneText;
    resultHint.textContent = hintText;

    resultCard.classList.remove("hidden");
    void resultCard.offsetWidth;
    resultCard.classList.add("show");
  });
});
