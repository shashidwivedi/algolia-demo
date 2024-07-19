const { algoliasearch, instantsearch } = window;

const searchClient = algoliasearch(
  '6Q32KNXTM0',
  'cf8b317ecdb2a2225189ffabd6fd2425'
);

// main InstantSearch instance
const search = instantsearch({
  indexName: 'ecommerce',
  searchClient,
  routing: false,
});

const searchBox = instantsearch.widgets.searchBox({
  container: '#searchbox',
  placeholder: 'Search...',
  showLoadingIndicator: true,
  showReset: true,
  showSubmit: true,
  cssClasses: {
    root: 'custom-searchbox',
  },
  searchAsYouType: true,
  queryHook(query, refine) {
    // Update query for both indices
    refine(query);
    incipioIndex.helper.setQuery(query).search();
    otterBoxIndex.helper.setQuery(query).search();
  },
});

const categoriesRefinementList = instantsearch.widgets.refinementList({
  container: '#categories',
  attribute: 'categories',
  searchable: true,
  searchablePlaceholder: 'Search categories',
  queryHook(query, refine) {
    // Update query for both indices
    refine(query);
    incipioIndex.helper.setQuery(query).search();
    otterBoxIndex.helper.setQuery(query).search();
  },
});

// Define configure widgets for Incipio and OtterBox
const configureIncipio = instantsearch.widgets.configure({
  filters: 'brand:"Incipio"',
  hitsPerPage: 8,
});

const configureOtterBox = instantsearch.widgets.configure({
  filters: 'brand:"OtterBox"',
  hitsPerPage: 8,
});

const hitsIncipio = instantsearch.widgets.hits({
  container: '#incipio-hits',
  templates: {
    item: (hit, { html, components }) => html`
      <article>
        <img src="${hit.image}" alt="${hit.name}" />
        <div>
          <h1>${components.Highlight({ hit, attribute: 'name' })}</h1>
          <p>${components.Highlight({ hit, attribute: 'description' })}</p>
        </div>
      </article>
    `,
  },
});

const paginationIncipio = instantsearch.widgets.pagination({
  container: '#incipio-pagination',
});

const hitsOtterBox = instantsearch.widgets.hits({
  container: '#otterbox-hits',
  templates: {
    item: (hit, { html, components }) => html`
      <article>
        <img src="${hit.image}" alt="${hit.name}" />
        <div>
          <h1>${components.Highlight({ hit, attribute: 'name' })}</h1>
          <p>${components.Highlight({ hit, attribute: 'description' })}</p>
        </div>
      </article>
    `,
  },
});

const paginationOtterBox = instantsearch.widgets.pagination({
  container: '#otterbox-pagination',
});

search.addWidgets([searchBox]);
// search.addWidgets([categoriesRefinementList]);

const incipioIndex = instantsearch({
  indexName: 'ecommerce',
  searchClient,
  routing: true,
});

incipioIndex.addWidgets([
  configureIncipio,
  hitsIncipio,
  paginationIncipio,
]);

const otterBoxIndex = instantsearch({
  indexName: 'ecommerce',
  searchClient,
  routing: true,
});

otterBoxIndex.addWidgets([
  configureOtterBox,
  hitsOtterBox,
  paginationOtterBox,
]);

search.start();
incipioIndex.start();
otterBoxIndex.start();
