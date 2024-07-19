const { algoliasearch, instantsearch } = window;

const searchClient = algoliasearch(
  '6Q32KNXTM0',
  '715528e434b28889c7b6077d834b27f0'
);

// Create the InstantSearch instance
const search = instantsearch({
  indexName: 'ecommerce', // Single index for both brands
  searchClient,
  routing: true,
});

// Define the shared search box widget
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

// Define the configure widgets to apply brand-specific filters
const configureIncipio = instantsearch.widgets.configure({
  filters: 'brand:"Incipio"',
});

const configureOtterBox = instantsearch.widgets.configure({
  filters: 'brand:"OtterBox"',
});

// Instantiate hits and pagination widgets for Incipio
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

// Instantiate hits and pagination widgets for OtterBox
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

// Add the shared search box widget to the main search instance
search.addWidgets([searchBox]);

// Create the Incipio index with its own configure, hits, and pagination widgets
const incipioIndex = instantsearch({
  indexName: 'ecommerce',
  searchClient,
  routing: true,
});

incipioIndex.addWidgets([configureIncipio, hitsIncipio, paginationIncipio]);

// Create the OtterBox index with its own configure, hits, and pagination widgets
const otterBoxIndex = instantsearch({
  indexName: 'ecommerce',
  searchClient,
  routing: true,
});

otterBoxIndex.addWidgets([configureOtterBox, hitsOtterBox, paginationOtterBox]);

// Start all search instances
search.start();
incipioIndex.start();
otterBoxIndex.start();
