//javascript:
(function () {
  if (window.location.href.includes('https://kokoiko.smbc-card.com/shop_list/indexed/')) {
    /** xx��� */
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
          throw new Error('������܂���ł���' + elName);
        }
      }
    }

    /** ���C������ **/
    async function main() {
      const ulEls = document.querySelectorAll('.indexedArea__list');
      console.log('----- �C���f�b�N�X�G���A�擾 -----');
      for (const ulEl of ulEls) {
        console.log('�G���g���[�ΏۃA�C�E�G�I�s', ulEl);
        const liEls = ulEl.querySelectorAll('li');
        for (const liEl of liEls) {
          console.log('�G���g���[�Ώۗv�f', liEl);
          try {
            liEl.querySelector('a').click();
          } catch (e) {
            console.log('�G���g���[�N���b�N�ŃG���[����', e);
          }
          try {
            await waitEl('#js-shopModal.is-show');
          } catch (err) {
            console.log(err);
            continue;
          }
          console.log('�Ώۗv�f�N���b�N');
          const modalEl = document.querySelector('#js-shopModal.is-show');
          console.log('���[�_���v�f', modalEl);
          const btnEl = modalEl.querySelector('#EntryButton');
          console.log('�{�^���v�f', btnEl);
          const isDone = btnEl.querySelector('.shopDetailEntryButton__flexCenter.shopDetailEntryButton--done');
          console.log('�G���g���[����', isDone);
          if (isDone) {
            document.querySelector('.shopModal__btnClose').click();
            console.log('�N���[�Y�{�^���N���b�N');
          } else {
            btnEl.querySelector('a').click();
            console.log('�G���g���[�{�^���N���b�N');
            await sleep(4000);
            document.querySelector('.shopModal__btnClose').click();
            console.log('�N���[�Y�{�^���N���b�N');
          }
        }
      }
    }
    main();
  } else {
    window.location.href = 'https://kokoiko.smbc-card.com/shop_list/indexed/';
  }
})();
