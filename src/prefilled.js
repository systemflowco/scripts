// SYSTEM FLOW Prefilled Form Inputs Value
(() => {
  const forms = document.querySelectorAll('form');

  if (forms.length) {
    forms.forEach((form) => {
      const inputs = form.querySelectorAll('input');

      if (inputs) {
        inputs.forEach((input) => {
          if (input.type != 'submit') {
            const prefilled = input.getAttribute('data-sysflow-prefilled');
            input.value = prefilled != '0' ? prefilled : '';
          }
        });
      }
    });
  }
})();
