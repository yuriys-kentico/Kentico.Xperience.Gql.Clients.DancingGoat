const path = require(`path`);

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;

  const {
    data: {
      xperience: { site },
    },
  } = await graphql(`
    {
      xperience {
        site(name: "DancingGoatCore") {
          articles: page(path: "/Articles") {
            articles: children(types: ["DancingGoatCore.Article"]) {
              url(relative: true)
              path
            }
          }
        }
      }
    }
  `);

  site.articles.articles.forEach((article) =>
    createPage({
      path: article.url,
      component: path.resolve(`./src/templates/article.tsx`),
      context: {
        articlePath: article.path,
      },
    })
  );
};
