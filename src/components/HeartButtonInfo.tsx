// @ts-nocheck
function HeartButtonInfo({
    handleHeartCharge,
    handleToggleClick,
}) {
    

    
    return (
        <div className="charge-request-clicked">
        <div className="charge-request-clicked-top">
            ❤️포인트 하트로 교환하기
            <button
            className="charge-request-clicked-img"
            type="button"
            onClick={handleToggleClick}
            //onClick={handleNotService}
            >
            <img
                src="/assets/arrowup.svg"
                alt="충전요청 닫기"
            />
            </button>
        </div>
        <li className="charge-request-clicked-text">
            500P당 1회의 기회를 가질 수 있습니다
        </li>
        <li className="charge-request-clicked-text">
            1개는 500P, 2개는 1000P, 3개는 1000P로 교환할 수 있습니다(2+1)
        </li>
        <li className="charge-request-clicked-text">
            포인트를 PickMe로 바꾸고 싶을때 버튼을 눌러 주세요
        </li>
        <button
            className="charge-request-clicked-button"
            onClick={handleHeartCharge}
            
        >
            하트 충전하기
        </button>
        
        </div>
    );
}

export default HeartButtonInfo;
