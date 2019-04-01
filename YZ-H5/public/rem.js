/**
     * rem方案, 在375px的宽度下,基础字体大小为12px
     * */
    (function (win, doc) {

      var documentHTML = doc.documentElement;

      setRootFont();

      function setRootFont() {
        var docWidth = documentHTML.getBoundingClientRect().width;
        documentHTML.style.fontSize = docWidth / 31.25 + 'px';
      }

      win.addEventListener('resize', setRootFont, false);

    })(window, document);