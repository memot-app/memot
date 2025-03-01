"use client"
import React from 'react';
import Link from "next/link";
import Image from 'next/image';
import ReactMarkdown from 'react-markdown';

const termsMarkdown = `
## 利用規約 & プライバシーポリシー

### 重要事項
- 本サービスは無料で提供され、商用目的での利用は禁止されています。
- 不適切な発言や他ユーザーを傷つける行為は禁止され、アカウント停止の可能性があります。
- 個人情報（メールアドレス・IPアドレス・Googleアカウント連携情報）を収集しますが、第三者提供は行いません。
- サービス内容は予告なく変更されることがあります。

---

## 利用規約

### 第1条 (本サービスの概要)
本サービスは、日常のひとことを投稿・共有できるSNSであり、追加機能としてAIが予定を提案するサービスです。ユーザーは自分の日常のひとことを登録することなく投稿し、それを他のユーザーと共有することができます。

### 第2条 (利用範囲)
- 本サービスは無料で利用できます。
- 商用目的の利用は基本的に禁止します。

### 第3条 (ユーザーの従うべき要素)
- コミュニティガイドラインを別に定めており、ユーザーはそれに従う必要があります。

### 第4条 (サービスの変更・終了)
- サービスの仕様変更、一部の終了または削除は主旨の判断で行うことができます。
- 変更情報はシステム通知により共有します。

### 第5条 (免責事項)
- ユーザーが本サービスを通じて受けた何らかの損害について、主旨は一切責任を負いません。

### 第6条 (アカウントの管理)
- 本サービスの利用に年齢制限はありません。
- 不適切な発言や他ユーザーを傷つける行為が発覚した場合、主旨の判断でアカウントの停止や削除を行うことがあります。

### 第7条 (経済決済)
- 本サービスは無料であり、販売や金銭取引は一切行いません。

---

## プライバシーポリシー

### 取得する情報
- メールアドレス
- IPアドレス
- Googleアカウント連携情報

### 情報の利用目的
- カスタマーサポートやアカウント管理

### 情報の第三者提供
- 基本的に第三者へ個人情報を提供することはありません。

### 情報の削除権
- ユーザーは、自身の情報を削除する権利を有します。
`;

const TermsPrivacyPage = () => {
  return (
    <div className="mx-auto flex items-center justify-center w-full min-h-screen bg-white px-4 md:px-8 fixed top-0 left-0">
      <div className="flex flex-col items-center w-full max-w-2xl h-screen">
        <Link href="/" className="mb-8 inline-flex items-center gap-5 text-2xl font-bold text-black md:text-3xl" aria-label="logo">
          <Image
            src="/icons/club-icon.svg"
            alt="Example Image"
            width={40}
            height={40}
          />
          Webut
        </Link>
        
        <div className="mb-8 w-full text-gray-600 text-sm md:text-base overflow-y-auto h-[60vh] p-4 border border-gray-300 rounded-lg">
          <ReactMarkdown>{termsMarkdown}</ReactMarkdown>
        </div>
        
        <Link href="/" className="mt-4 inline-block rounded-lg bg-gray-200 px-8 py-3 text-center text-sm font-semibold text-gray-500 outline-none ring-indigo-300 transition duration-100 hover:bg-gray-300 focus-visible:ring active:text-gray-700 md:text-base">ホームに戻る</Link>
      </div>
    </div>
  );
}

export default TermsPrivacyPage;
