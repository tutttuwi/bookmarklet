//javascript:
(function () {
  if (window.location.href.includes('https://kokoiko.smbc-card.com/shop_list/indexed/')) {
    /** xx画面 */
    async function sleep(ms) {
      return new Promise(r => setTimeout(r, ms));
    }

    async function waitEl(elName) {
      let waitCnt = 0;
      var isExists = document.querySelector(elName);
      while (!isExists) {
        await sleep(1000);
        isExists = document.querySelector(elName);
        waitCnt++;
        if (waitCnt > 10) {
          throw new Error('見つかりませんでした' + elName);
        }
      }
    }

    /** メイン処理 **/
    async function main() {
      const ulEls = document.querySelectorAll('.indexedArea__list');
      console.log('----- インデックスエリア取得 -----');
      for (const ulEl of ulEls) {
        console.log('エントリー対象アイウエオ行', ulEl);
        const liEls = ulEl.querySelectorAll('li');
        for (const liEl of liEls) {
          console.log('エントリー対象要素', liEl);
          try {
            liEl.querySelector('a').click();
          } catch (e) {
            console.log('エントリークリックでエラー発生', e);
          }
          try {
            await waitEl('#js-shopModal.is-show');
          } catch (err) {
            console.log(err);
            continue;
          }
          console.log('対象要素クリック');
          const modalEl = document.querySelector('#js-shopModal.is-show');
          console.log('モーダル要素', modalEl);
          const btnEl = modalEl.querySelector('#EntryButton');
          console.log('ボタン要素', btnEl);
          const isDone = btnEl.querySelector('.shopDetailEntryButton__flexCenter.shopDetailEntryButton--done');
          console.log('エントリー未済', isDone);
          if (isDone) {
            document.querySelector('.shopModal__btnClose').click();
            console.log('クローズボタンクリック');
          } else {
            btnEl.querySelector('a').click();
            console.log('エントリーボタンクリック');
            await sleep(4000);
            document.querySelector('.shopModal__btnClose').click();
            console.log('クローズボタンクリック');
          }
        }
      }
    }
    main();
  } else {
    window.location.href = 'https://kokoiko.smbc-card.com/shop_list/indexed/';
  }
})();
