import { describe, expect, it, vi } from 'vitest';
// biome-ignore lint/correctness/noUnusedImports: JSDocにて引用
import type { SITE } from '~/constants/metadata';
import { checkURL } from './url';

/**
 * 定数のモック
 * @see SITE.url
 */
vi.mock('~/constants/metadata', () => ({
  SITE: {
    url: 'https://example.com',
  },
}));

describe('checkURL', () => {
  describe('相対パス', () => {
    it('ルート相対パスを内部URLとして判定する', () => {
      const result = checkURL('/');
      expect(result.isURL).toBe(true);

      if (result.isURL) {
        expect(result.isExternal).toBe(false);
      }
    });

    it('単純な相対パスを内部URLとして判定する', () => {
      const result = checkURL('/about');
      expect(result.isURL).toBe(true);

      if (result.isURL) {
        expect(result.isExternal).toBe(false);
      }
    });

    it('ネストされた相対パスを内部URLとして判定する', () => {
      const result = checkURL('/path/to/page');
      expect(result.isURL).toBe(true);

      if (result.isURL) {
        expect(result.isExternal).toBe(false);
      }
    });

    it('クエリパラメータを含む相対パスを内部URLとして判定する', () => {
      const result = checkURL('/search?q=test&page=1');
      expect(result.isURL).toBe(true);

      if (result.isURL) {
        expect(result.isExternal).toBe(false);
      }
    });

    it('ハッシュを含む相対パスを内部URLとして判定する', () => {
      const result = checkURL('/docs#installation');
      expect(result.isURL).toBe(true);

      if (result.isURL) {
        expect(result.isExternal).toBe(false);
      }
    });

    it('クエリパラメータとハッシュの両方を含む相対パスを内部URLとして判定する', () => {
      const result = checkURL('/page?param=value#section');
      expect(result.isURL).toBe(true);

      if (result.isURL) {
        expect(result.isExternal).toBe(false);
      }
    });

    it('特殊文字を含む相対パスを内部URLとして判定する', () => {
      const result = checkURL('/path-with-dashes_and_underscores');
      expect(result.isURL).toBe(true);

      if (result.isURL) {
        expect(result.isExternal).toBe(false);
      }
    });

    it('エンコードされた文字を含む相対パスを内部URLとして判定する', () => {
      const result = checkURL('/path%20with%20spaces');
      expect(result.isURL).toBe(true);

      if (result.isURL) {
        expect(result.isExternal).toBe(false);
      }
    });

    it('ドットを含む相対パスを内部URLとして判定する', () => {
      const result = checkURL('/file.pdf');
      expect(result.isURL).toBe(true);

      if (result.isURL) {
        expect(result.isExternal).toBe(false);
      }
    });
  });

  describe('プロトコル相対URL', () => {
    it('プロトコル相対URLを内部URLとして判定する', () => {
      /**
       * @todo 現在の実装では、//で始まるURLも相対パスとして扱われる
       */
      const result = checkURL('//cdn.example.com');
      expect(result.isURL).toBe(true);

      if (result.isURL) {
        expect(result.isExternal).toBe(false);
      }
    });

    it('外部ドメインのプロトコル相対URLも内部URLとして判定する', () => {
      const result = checkURL('//external.com/resource');
      expect(result.isURL).toBe(true);

      if (result.isURL) {
        expect(result.isExternal).toBe(false);
      }
    });
  });

  describe('絶対URL', () => {
    it('HTTPS URLを正しく判定する', () => {
      const result = checkURL('https://test.com');
      expect(result.isURL).toBe(true);

      if (result.isURL) {
        expect(result.isExternal).toBe(true);
      }
    });

    it('HTTP URLを正しく判定する', () => {
      const result = checkURL('http://test.com');
      expect(result.isURL).toBe(true);

      if (result.isURL) {
        expect(result.isExternal).toBe(true);
      }
    });

    it('同じドメインの絶対URLを内部URLとして判定する', () => {
      const result = checkURL('https://example.com');
      expect(result.isURL).toBe(true);

      if (result.isURL) {
        expect(result.isExternal).toBe(false);
      }
    });

    it('同じドメインでパスを含む絶対URLを内部URLとして判定する', () => {
      const result = checkURL('https://example.com/path/to/page');
      expect(result.isURL).toBe(true);

      if (result.isURL) {
        expect(result.isExternal).toBe(false);
      }
    });
  });

  describe('無効なURL', () => {
    it('空文字列を無効なURLとして判定する', () => {
      const result = checkURL('');
      expect(result.isURL).toBe(false);
      expect('isExternal' in result).toBe(false);
    });

    it('プロトコルなしの外部ドメインを無効なURLとして判定する', () => {
      const result = checkURL('example.com');
      expect(result.isURL).toBe(false);
      expect('isExternal' in result).toBe(false);
    });

    it('不正な形式の文字列を無効なURLとして判定する', () => {
      const result = checkURL('not a url at all');
      expect(result.isURL).toBe(false);
      expect('isExternal' in result).toBe(false);
    });

    it('相対パスでない通常の文字列を無効なURLとして判定する', () => {
      const result = checkURL('some-text');
      expect(result.isURL).toBe(false);
      expect('isExternal' in result).toBe(false);
    });
  });

  describe('HTTPSとHTTP以外のプロトコル', () => {
    it('FTPプロトコルを無効なURLとして判定する', () => {
      const result = checkURL('ftp://test.com');
      expect(result.isURL).toBe(false);
      expect('isExternal' in result).toBe(false);
    });

    it('mailtoプロトコルを無効なURLとして判定する', () => {
      const result = checkURL('mailto:test@example.com');
      expect(result.isURL).toBe(false);
      expect('isExternal' in result).toBe(false);
    });

    it('JavaScriptプロトコルを無効なURLとして判定する', () => {
      const result = checkURL('javascript:alert("test")');
      expect(result.isURL).toBe(false);
      expect('isExternal' in result).toBe(false);
    });

    it('dataプロトコルを無効なURLとして判定する', () => {
      const result = checkURL('data:text/plain;base64,SGVsbG8=');
      expect(result.isURL).toBe(false);
      expect('isExternal' in result).toBe(false);
    });
  });

  describe('ポート番号を含むURL', () => {
    it('ポート番号を含む外部URLを正しく判定する', () => {
      const result = checkURL('https://test.com:8080');
      expect(result.isURL).toBe(true);

      if (result.isURL) {
        expect(result.isExternal).toBe(true);
      }
    });

    it('ポート番号を含む内部URLを正しく判定する', () => {
      const result = checkURL('https://example.com:3000');
      expect(result.isURL).toBe(true);

      if (result.isURL) {
        expect(result.isExternal).toBe(false);
      }
    });
  });

  describe('サブドメイン', () => {
    it('サブドメインを含む外部URLを正しく判定する', () => {
      const result = checkURL('https://sub.test.com');
      expect(result.isURL).toBe(true);

      if (result.isURL) {
        expect(result.isExternal).toBe(true);
      }
    });

    it('同じドメインのサブドメインを外部URLとして判定する', () => {
      const result = checkURL('https://sub.example.com');
      expect(result.isURL).toBe(true);

      if (result.isURL) {
        expect(result.isExternal).toBe(true);
      }
    });
  });

  describe('大文字小文字', () => {
    it('大文字のプロトコルを正しく判定する', () => {
      const result = checkURL('HTTPS://test.com');
      expect(result.isURL).toBe(true);

      if (result.isURL) {
        expect(result.isExternal).toBe(true);
      }
    });

    it('大文字小文字混在のドメインを正しく判定する', () => {
      const result = checkURL('https://Example.COM');
      expect(result.isURL).toBe(true);

      if (result.isURL) {
        expect(result.isExternal).toBe(false);
      }
    });
  });

  describe('IPアドレス', () => {
    it('IPv4アドレスを正しく判定する', () => {
      const result = checkURL('http://192.168.1.1');
      expect(result.isURL).toBe(true);

      if (result.isURL) {
        expect(result.isExternal).toBe(true);
      }
    });

    it('IPv6アドレスを正しく判定する', () => {
      const result = checkURL('http://[::1]');
      expect(result.isURL).toBe(true);

      if (result.isURL) {
        expect(result.isExternal).toBe(true);
      }
    });

    it('localhostを外部URLとして判定する', () => {
      const result = checkURL('http://localhost:3000');
      expect(result.isURL).toBe(true);

      if (result.isURL) {
        expect(result.isExternal).toBe(true);
      }
    });
  });
});
