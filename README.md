<div align="center">
  <a href="https://lp.memot.app" target="_blank" rel="noopener noreferrer">
    <img src="./src/assets/memot-logo-full-color.svg" alt="memot logo" width="320" />
  </a>
</div>
<div align="center">
  <a href="https://lp.memot.app" target="_blank" rel="noopener noreferrer">
    めもっと
  </a>
</div>

## 概要

このリポジトリは、アプリ「めもっと」のランディングページのソースコードです。

## 技術スタック

| カテゴリ                    | 技術                                                  |
| --------------------------- | ----------------------------------------------------- |
| **フレームワーク**          | [Astro](https://astro.build/)                         |
| **スタイリング**            | [Tailwind CSS](https://tailwindcss.com/)              |
| **ホスティング**            | [Vercel](https://vercel.com/)                         |
| **リンター/フォーマッター** | [Biome](https://biomejs.dev/)                         |
| **テスト**                  | [Vitest](https://vitest.dev/)                         |
| **CI/CD**                   | [GitHub Actions](https://github.com/features/actions) |
| **パッケージ管理**          | [pnpm](https://pnpm.io/)                              |

## はじめに

### 前提条件

- [Node.js](https://nodejs.org/) (v22 以上)
- [pnpm](https://pnpm.io/) (v10 以上)

### インストール

1. リポジトリをクローンします:
   ```bash
   git clone git@github.com:memot-app/memot.git
   ```
2. プロジェクトディレクトリに移動します:
   ```bash
   cd memot
   ```
3. 依存関係をインストールします:
   ```bash
   pnpm install
   ```

### 開発

開発サーバーを起動するには、以下を実行します:

```bash
pnpm dev
```

ブラウザで [http://localhost:4321](http://localhost:4321) を開いて結果を確認します。

## コマンド一覧

| コマンド       | 説明                                                                                       |
| -------------- | ------------------------------------------------------------------------------------------ |
| `pnpm dev`     | 開発サーバーを起動します。                                                                 |
| `pnpm build`   | 本番用にアプリケーションをビルドします。                                                   |
| `pnpm preview` | 本番ビルドをローカルでプレビューします。                                                   |
| `pnpm test`    | Vitest を使用してテストを実行します。                                                      |
| `pnpm check`   | すべてのチェック（Astro および Biome）を実行します。                                       |
| `pnpm fix`     | Biome でリンティングとフォーマットの問題を自動的に修正します。Astro ファイルは対象外です。 |

## 貢献

貢献を歓迎します！詳細については、[コントリビューションガイドライン](./CONTRIBUTING.ja.md)をご覧ください。

## ライセンス

このプロジェクトは[GNU AGPLv3 ライセンス](LICENSE)の下でライセンスされています。
