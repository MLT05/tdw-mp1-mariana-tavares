const POST_GRAPHQL_FIELDS = `
  slug
  title
  coverImage {
    url
  }
  date
  author {
    ... on Author {
      name
      picture {
        url
      }
    }
  }
  excerpt
  content {
    json
  }
`;

type ContentfulResponse<T> = {
  data?: T;
  errors?: Array<{ message: string }>;
};

type PostCollectionResponse = {
  postCollection?: {
    items?: any[];
  };
};

async function fetchGraphQL<T = PostCollectionResponse>(
  query: string,
  preview = false,
): Promise<ContentfulResponse<T>> {
  const spaceId = process.env.CONTENTFUL_SPACE_ID;
  const token = preview
    ? process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN
    : process.env.CONTENTFUL_ACCESS_TOKEN;

  if (!spaceId) {
    throw new Error("Falta a variável de ambiente CONTENTFUL_SPACE_ID.");
  }

  if (!token) {
    throw new Error(
      `Falta a variável de ambiente ${
        preview ? "CONTENTFUL_PREVIEW_ACCESS_TOKEN" : "CONTENTFUL_ACCESS_TOKEN"
      }.`,
    );
  }

  const endpoint = `https://graphql.contentful.com/content/v1/spaces/${spaceId}`;

  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ query }),
    next: { tags: ["posts"] },
  });

  if (!response.ok) {
    const errorText = await response.text();

    console.error(`[Contentful API Error ${response.status}]:`, errorText);

    throw new Error(
      `Falha na requisição GraphQL do Contentful: ${response.status} ${response.statusText}. Verifica o endpoint, o SPACE_ID e as permissões do token.`,
    );
  }

  const result = (await response.json()) as ContentfulResponse<T>;

  if (result.errors?.length) {
    console.error("[Contentful GraphQL Error]:", result.errors);

    throw new Error(
      `Erro GraphQL do Contentful: ${result.errors
        .map((error) => error.message)
        .join("; ")}`,
    );
  }

  return result;
}

function extractPost(
  fetchResponse: ContentfulResponse<PostCollectionResponse>,
): any {
  return fetchResponse.data?.postCollection?.items?.[0];
}

function extractPostEntries(
  fetchResponse: ContentfulResponse<PostCollectionResponse>,
): any[] {
  const items = fetchResponse.data?.postCollection?.items;

  if (!items) {
    console.error("[Contentful] A resposta não contém postCollection.items.");
    return [];
  }

  return items;
}

export async function getPreviewPostBySlug(slug: string | null): Promise<any> {
  if (!slug) {
    return undefined;
  }

  const query = `
    query {
      postCollection(
        where: { slug: ${JSON.stringify(slug)} }
        preview: true
        limit: 1
      ) {
        items {
          ${POST_GRAPHQL_FIELDS}
        }
      }
    }
  `;

  const entry = await fetchGraphQL(query, true);

  return extractPost(entry);
}

export async function getAllPosts(isDraftMode: boolean): Promise<any[]> {
  const query = `
    query {
      postCollection(
        where: { slug_exists: true }
        order: date_DESC
        preview: ${isDraftMode ? "true" : "false"}
      ) {
        items {
          ${POST_GRAPHQL_FIELDS}
        }
      }
    }
  `;

  const entries = await fetchGraphQL(query, isDraftMode);

  return extractPostEntries(entries);
}

export async function getPostAndMorePosts(
  slug: string,
  preview: boolean,
): Promise<any> {
  const postQuery = `
    query {
      postCollection(
        where: { slug: ${JSON.stringify(slug)} }
        preview: ${preview ? "true" : "false"}
        limit: 1
      ) {
        items {
          ${POST_GRAPHQL_FIELDS}
        }
      }
    }
  `;

  const morePostsQuery = `
    query {
      postCollection(
        where: { slug_not_in: [${JSON.stringify(slug)}] }
        order: date_DESC
        preview: ${preview ? "true" : "false"}
        limit: 2
      ) {
        items {
          ${POST_GRAPHQL_FIELDS}
        }
      }
    }
  `;

  const [entry, entries] = await Promise.all([
    fetchGraphQL(postQuery, preview),
    fetchGraphQL(morePostsQuery, preview),
  ]);

  return {
    post: extractPost(entry),
    morePosts: extractPostEntries(entries),
  };
}
