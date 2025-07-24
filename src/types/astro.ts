import type { HTMLTag, Polymorphic } from 'astro/types';

/**
 * 任意のHTML要素にできるコンポーネントのProps型
 * @template DefaultTag デフォルトでレンダリングするHTML要素
 * @template AdditionalProps 追加のプロパティ
 * @template AllowedTags 許可するHTMLタグ
 *
 * @see {@link https://docs.astro.build/ja/guides/typescript}
 */
export type PolymorphicProps<
  DefaultTag extends HTMLTag = 'div',
  AdditionalProps = Record<never, never>,
  AllowedTags extends HTMLTag = HTMLTag,
> = Polymorphic<{
  as: DefaultTag | AllowedTags;
}> &
  AdditionalProps;
