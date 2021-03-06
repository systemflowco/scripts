(() => {
  class Query {
    constructor(initialQuery) {
      this.query = [];

      if (initialQuery) {
        this.parse(initialQuery);
      }
    }

    parse(queryString) {
      const parts = (
        queryString.charAt(0) === '?' ? queryString.slice(1) : queryString
      ).split('&');

      parts.forEach((part) => {
        const [key, val] = part.split('=');
        this.set(key, decodeURIComponent(val));
      });
    }

    get(keyToCheck) {
      const item = this.query.find(({ key }) => key === keyToCheck);

      return item ? item.value : null;
    }

    set(keyToSet, value) {
      this.remove(keyToSet);
      this.query.push({ key: keyToSet, value });
    }

    remove(keyToRemove) {
      this.query = this.query.filter(({ key }) => key !== keyToRemove);
    }
  }

  const queries = document.querySelectorAll('[data-sysflow-query]');

  if (queries.length) {
    const query = new Query(window.location.search);

    queries.forEach((q) => {
      const queryKey = q.dataset.sysflowQuery;
      const queryValue = query.get(queryKey);
      const queryDefault = q.dataset.sysflowQueryDefault;

      //hide container with query not present in url and query default set to 0
      if (!queryValue && queryDefault === '0') {
        q.style.display = 'none';
      } else {
        //show text of query inside of container (only if set in url ex. q=123)
        const qTexts = q.querySelectorAll('[data-sysflow-query-text');
        if (qTexts.length) {
          qTexts.forEach((qText) => {
            if (!queryValue || queryValue == 'undefined') {
              qText.innerText = queryDefault;
            } else {
              qText.innerText = queryValue;
            }
          });
        }
      }
    });
  }
})();
