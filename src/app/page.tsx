"use client";

import React from "react";
import Button from "@/components/Button/";

export default function Home() {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    console.log("Clicked!", e.currentTarget);
  };

  return (
    <div className="min-h-screen p-10 bg-bg200 text-white space-y-12">
      <h1 className="text-xl-bold text-blue">Button Test Page</h1>

      {/* Filled Green (기본/호버/프레스드) */}
      <div className="flex gap-4">
        <Button className="bg-primary text-white w-[332px] h-12 rounded-xl">
          생성하기
        </Button>
        <Button className="bg-primary-hover text-white w-[332px] h-12 rounded-xl">
          생성하기
        </Button>
        <Button className="bg-primary-pressed text-white w-[332px] h-12 rounded-xl">
          생성하기
        </Button>
      </div>

      {/* Inverse White (Primary 텍스트, 각 상태) */}
      <div className="flex gap-4">
        <Button variant="inverse" className="text-primary border-primary">
          생성하기
        </Button>
        <Button
          variant="inverse"
          className="text-primary-hover border-primary-hover"
        >
          생성하기
        </Button>
        <Button
          variant="inverse"
          className="text-primary-pressed border-primary-pressed"
        >
          생성하기
        </Button>
      </div>

      {/* Gray Text 버튼들 */}
      <div className="flex gap-4">
        <Button variant="textgraylight">생성하기</Button>
        <Button variant="textgray">생성하기</Button>
      </div>

      {/* Danger + Filled Gray */}
      <div className="flex gap-4">
        <Button variant="danger">생성하기</Button>
        <Button variant="grayfilled">생성하기</Button>
      </div>

      {/* Small Filled */}
      <div className="flex gap-2">
        <Button variant="primary" size="small">
          생성하기
        </Button>
        <Button variant="primary" size="small" className="bg-primary-hover">
          생성하기
        </Button>
        <Button variant="primary" size="small" className="bg-primary-pressed">
          생성하기
        </Button>
        <Button variant="grayfilled" size="small">
          생성하기
        </Button>
      </div>

      {/* Small Inverse + Gray */}
      <div className="flex gap-2">
        <Button variant="inverse" size="small">
          생성하기
        </Button>
        <Button
          variant="inverse"
          size="small"
          className="text-primary-hover border-primary-hover"
        >
          생성하기
        </Button>
        <Button
          variant="inverse"
          size="small"
          className="text-primary-pressed border-primary-pressed"
        >
          생성하기
        </Button>
        <Button variant="textgraySmall" size="small">
          생성하기
        </Button>
      </div>

      {/* 할 일 추가 */}
      <div className="flex gap-2">
        <Button variant="plus" size="plus" icon="plus">
          할 일 추가
        </Button>
        <Button
          variant="plus"
          size="plus"
          icon="plus"
          className="bg-primary-hover"
        >
          할 일 추가
        </Button>
        <Button
          variant="plus"
          size="plus"
          icon="plus"
          className="bg-primary-pressed"
        >
          할 일 추가
        </Button>
        <Button variant="grayfilled" size="plus" icon="plus">
          할 일 추가
        </Button>
      </div>

      {/* 완료하기 */}
      <div className="flex gap-2 mt-4">
        <Button variant="complete" size="complete" icon="check">
          완료하기
        </Button>
        <Button
          variant="complete"
          size="complete"
          icon="check"
          className="bg-primary-hover"
        >
          완료하기
        </Button>
        <Button
          variant="complete"
          size="complete"
          icon="check"
          className="bg-primary-pressed"
        >
          완료하기
        </Button>
        <Button variant="grayfilled" size="complete" icon="check">
          완료하기
        </Button>
      </div>

      {/* 완료 취소하기 */}
      <div className="flex gap-2 mt-4">
        <Button variant="cancel" size="cancel" icon="check">
          완료 취소하기
        </Button>
        <Button
          variant="cancel"
          size="cancel"
          icon="check"
          className="border-primary-hover text-primary-hover"
        >
          완료 취소하기
        </Button>
        <Button
          variant="cancel"
          size="cancel"
          icon="check"
          className="border-primary-pressed text-primary-pressed"
        >
          완료 취소하기
        </Button>
        <Button variant="textgraylight" size="cancel" icon="check">
          완료 취소하기
        </Button>
      </div>

      {/* Custom */}
      <div>
        <Button
          className="w-[460px] text-md-bold text-blue border border-blue"
          onClick={handleClick}
        >
          커스터마이즈 버튼
        </Button>
      </div>
    </div>
  );
}
