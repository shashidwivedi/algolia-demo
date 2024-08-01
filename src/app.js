const { algoliasearch, instantsearch } = window;

const searchClient = algoliasearch(
  '6Q32KNXTM0',
  'cf8b317ecdb2a2225189ffabd6fd2425'
);

const search = instantsearch({
  indexName: 'ecommerce',
  searchClient,
  routing: false,
});

search.addWidgets([
  instantsearch.widgets.refinementList({
    container: '#categories',
    attribute: 'categories',
    searchable: true,
    searchablePlaceholder: 'Search categories',
  }),
  instantsearch.widgets.configure({
    // filters: '(brand:"Incipio" AND brand:"OtterBox")',
    hitsPerPage: 8,
  }),
  instantsearch.widgets
    .index({ indexName: 'ecommerce' })
    .addWidgets([
      instantsearch.widgets.configure({
        filters: 'brand:"Incipio"',
        hitsPerPage: 8,
      }),
      instantsearch.widgets.hits({
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
      }),
      instantsearch.widgets.pagination({
        container: '#incipio-pagination',
      }),
    ]),
  instantsearch.widgets
    .index({ indexName: 'ecommerce' })
    .addWidgets([
      instantsearch.widgets.configure({
        filters: 'brand:"OtterBox"',
        hitsPerPage: 8,
      }),
      instantsearch.widgets.hits({
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
      }),
      instantsearch.widgets.pagination({
        container: '#otterbox-pagination',
      }),
    ]),
]);

search.start();
