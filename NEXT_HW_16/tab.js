document.addEventListener('DOMContentLoaded', function() {
    const buttons = document.querySelectorAll('.buttons button'); // 직접 button 선택
    const topboxTitle = document.querySelector('.topbox h1');
    const topboxText = document.querySelector('.topbox div');

    buttons.forEach(button => {
        button.addEventListener('click', function() {
            // 모든 버튼의 active 클래스 제거
            buttons.forEach(btn => btn.classList.remove('active'));
            // 현재 버튼에 active 클래스 추가
            this.classList.add('active');

            // 버튼에 따라 상단 텍스트 변경
            switch(this.textContent) {
                case 'About':
                    topboxTitle.textContent = 'About';
                    topboxText.textContent = 'About Page';
                    break;
                case 'Products':
                    topboxTitle.textContent = 'Products';
                    topboxText.textContent = 'Products Page';
                    break;
                case 'Technology':
                    topboxTitle.textContent = 'Technology';
                    topboxText.textContent = 'Technology Page';
                    break;
                case 'Downloads':
                    topboxTitle.textContent = 'Downloads';
                    topboxText.textContent = 'Downloads Page';
                    break;
            }
        });
    });

    // 초기 설정: 첫 번째 탭을 활성화
    buttons[0].click();
});
