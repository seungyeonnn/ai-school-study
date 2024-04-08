import React from "react";
import { Link } from "react-router-dom";

const GoodsItem = ({ item }) => {
  return (
    <div className="goods-item" style={{ position: "relative" }}>
      <div className="goods-item-icon">
        {/* 해당 상품이 new인지 best인지 조건부 렌더링을 통해 출력하시오. */}
        {item.new ? (
          <em className="goods-new">new</em>
        ) : item.best ? (
          <em className="goods-best">best</em>
        ) : (
          " "
        )}
      </div>
      <div className="goods-thumb">
        {/* 
          이미지 클릭 시, Link컴포넌트를 이용해 상세페이지로 이동하시오
          상세페이지 URL : /menu/상품의 id
        */}

        <Link to={`/menu/${item.id}`}>
          <img src={item.main_thumb} alt="이미지" />
        </Link>
      </div>
      <div className="goods-name">
        <h4>{item.name}</h4>
        <p>
          <span>{item.price}</span>원
        </p>
      </div>
    </div>
  );
};

export default GoodsItem;
