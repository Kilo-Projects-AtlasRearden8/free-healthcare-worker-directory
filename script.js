(function () {
  'use strict';

  const searchInput = document.getElementById('search');
  const filtersEl = document.getElementById('filters');
  const gridEl = document.getElementById('grid');
  const countEl = document.getElementById('count');

  let resources = [];
  let activeFilter = null;

  function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  function loadData() {
    return fetch('resources.json')
      .then(function (response) {
        if (!response.ok) throw new Error('Failed to load resources.json');
        return response.json();
      })
      .then(function (data) {
        resources = data.resources || [];
        renderFilters(data.categories || []);
        render();
      });
  }

  function renderFilters(categories) {
    const allChip = document.createElement('button');
    allChip.type = 'button';
    allChip.className = 'filter-chip active';
    allChip.textContent = 'All';
    allChip.addEventListener('click', function () {
      setFilter(null);
    });
    filtersEl.appendChild(allChip);

    categories.forEach(function (cat) {
      const chip = document.createElement('button');
      chip.type = 'button';
      chip.className = 'filter-chip';
      chip.textContent = cat.label;
      chip.dataset.key = cat.key;
      chip.addEventListener('click', function () {
        setFilter(cat.key);
      });
      filtersEl.appendChild(chip);
    });
  }

  function setFilter(key) {
    activeFilter = key;
    document.querySelectorAll('.filter-chip').forEach(function (chip) {
      const isAll = key === null && !chip.dataset.key;
      const isMatch = chip.dataset.key === key;
      chip.classList.toggle('active', isAll || isMatch);
    });
    render();
  }

  function matchesSearch(resource, query) {
    if (!query) return true;
    const q = query.toLowerCase();
    return (
      (resource.title || '').toLowerCase().includes(q) ||
      (resource.description || '').toLowerCase().includes(q) ||
      (resource.category || '').toLowerCase().includes(q) ||
      (resource.audience || '').toLowerCase().includes(q)
    );
  }

  function filteredResources() {
    const query = searchInput.value.trim();
    return resources.filter(function (r) {
      return matchesSearch(r, query) && (activeFilter === null || r.category === activeFilter);
    });
  }

  function render() {
    const list = filteredResources();
    countEl.textContent = list.length + ' resource' + (list.length !== 1 ? 's' : '') + ' found';

    gridEl.innerHTML = '';

    if (list.length === 0) {
      const empty = document.createElement('div');
      empty.className = 'empty';
      empty.textContent = 'No resources match your search.';
      gridEl.appendChild(empty);
      return;
    }

    list.forEach(function (resource) {
      const card = document.createElement('article');
      card.className = 'card';

      const categoryLabel = (function () {
        const cats = document.querySelectorAll('.filter-chip');
        for (let i = 0; i < cats.length; i++) {
          if (cats[i].dataset.key === resource.category) return cats[i].textContent;
        }
        return resource.category || '';
      })();

      card.innerHTML =
        '<div class="card-header">' +
        '<h3>' + escapeHtml(resource.title) + '</h3>' +
        '<span class="category">' + escapeHtml(categoryLabel) + '</span>' +
        '</div>' +
        '<p>' + escapeHtml(resource.description) + '</p>' +
        '<div class="card-footer">' +
        '<span class="meta">' + escapeHtml(resource.audience) + ' &middot; ' + escapeHtml(resource.cost) + '</span>' +
        '<a href="' + escapeHtml(resource.url) + '" class="btn" target="_blank" rel="noopener noreferrer">Visit site</a>' +
        '</div>';

      gridEl.appendChild(card);
    });
  }

  searchInput.addEventListener('input', render);

  loadData().catch(function (err) {
    gridEl.innerHTML = '<div class="empty">Unable to load resource data.</div>';
    countEl.textContent = '';
    console.error(err);
  });
})();
