"use client";

import CardDetailPage from "../components/CardDetailPage";

export default function CscsBlackCardPage() {
  return (
    <CardDetailPage
      cardType="black"
      title="CSCS Black Card"
      subhead="MANAGER"
      bgHex="#0f172a"
      cardName="Black Manager Card"
      easyApplyTitle="Black Manager Card"
      easyApplySub="Easy apply for CSCS Black Card - Managers."
      requirements={[
        { title: "CITB Test (MAP)", link: "#citb" },
      ]}
    />
  );
}
