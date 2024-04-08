// STEP1. moveLeft 함수를 선언
//        1-1) id가 horse인 말을 가져와서
//        1-2) moveLeft함수가 호출 될 때마다, 그 말을 왼쪽으로 50px씩 이동
//             단, 말이 배경을 벗어나지 않도록 할 것

let move = 0

const moveLeft = () => {
    //console.log('moveLeft function')
    if (move < 1100){
        move += 50
        $('#horse').css('right',move+'px')
        //right를 둔 이유 -> 오른쪽으로부터 얼마나 떨어져 있는지
        // left:50으로 주면 left에서 50px만큼 떨어져있다는 뜻으로 왼쪽을 통 튐
    }
}

// STEP2. moveRight 함수를 선언
//        2-1) id가 horse인 말을 가져와서
//        2-2) moveRight함수가 호출 될 때마다, 그 말을 오른쪽으로 50px씩 이동
//             단, 말이 배경을 벗어나지 않도록 할 것

const moveRight = () => {
    //console.log('moveRight function')
    if(move>0){
        move -= 50
        $('#horse').css('right',move+'px')}
}

const jump = () =>{
    //animate를 참고해서 말을 점프시켜보자
    $('#horse')
    .stop()
    .animate({bottom: '400px'}, 1000)
    .animate({bottom:'200px'}, 1000)
}

// STEP3. 왼쪽 버튼을 누를 때 마다, moveLeft 함수를 호출
$(".left").on("click", moveLeft)
// STEP4. 오른쪽 버튼을 누를 때마다, moveRight 함수를 호출
$(".right").on("click", moveRight)

/* 주의할 점!
    a. btn left는 하나의 클래스 이름이 아니라, btn이라는 클래스 / left라는 클래스 둘 다 포함
    b. 왼쪽으로 이동하든, 오른쪽으로 이동하든 결국 선은 하나로 이어져 있다. 출발선도 하나
    c. DOM 사용x, jQuery로 사용!
    d. 익명함수 x, 따로 함수 선언할 것
*/
//추가!
// (1) 마우스가 아니라 키보드를 통해서 말을 이동시켜보자
// 이벤트의 대상은 바디태그가 됨
$('body').on('keydown',(e)=>{
    //console.log('key down:', e.key)

    if (e.key=='ArrowLeft'){
        moveLeft()
    } else if (e.key === 'ArrowRight'){
        moveRight()
    } else if (e.key === ' '){
        console.log('space bar')
        jump()
    }
})
