import { createSchema, createYoga } from 'graphql-yoga';

const usersMock = [
    {id: 1, firstname: 'Wallace', lastname: 'Silva', email: 'email@domain.com'},
    {id: 2, firstname: 'Wallace 2', lastname: 'Silva', email: 'email2@domain.com'},
    {id: 3, firstname: 'Wallace 3', lastname: 'Silva', email: 'email3@domain.com'},
    {id: 4, firstname: 'Wallace 4', lastname: 'Silva', email: 'email4@domain.com'},
    {id: 5, firstname: 'Wallace 4', lastname: 'Silva', email: 'email4@domain.com'},
    {id: 6, firstname: 'Wallace 4', lastname: 'Silva', email: 'email4@domain.com'},
    {id: 7, firstname: 'Wallace 4', lastname: 'Silva', email: 'email4@domain.com'},
    {id: 8, firstname: 'Wallace 4', lastname: 'Silva', email: 'email4@domain.com'},
    {id: 9, firstname: 'Wallace 4', lastname: 'Silva', email: 'email4@domain.com'},
    {id: 10, firstname: 'Wallace 4', lastname: 'Silva', email: 'email4@domain.com'},
    {id: 11, firstname: 'Wallace 4', lastname: 'Silva', email: 'email4@domain.com'},
    {id: 12, firstname: 'Wallace 4', lastname: 'Silva', email: 'email4@domain.com'},
    {id: 13, firstname: 'Wallace 4', lastname: 'Silva', email: 'email4@domain.com'},
    {id: 14, firstname: 'Wallace 4', lastname: 'Silva', email: 'email4@domain.com'},
    {id: 15, firstname: 'Wallace 4', lastname: 'Silva', email: 'email4@domain.com'},
    {id: 16, firstname: 'Wallace 4', lastname: 'Silva', email: 'email4@domain.com'},
    {id: 17, firstname: 'Wallace 4', lastname: 'Silva', email: 'email4@domain.com'},
    {id: 18, firstname: 'Wallace 4', lastname: 'Silva', email: 'email4@domain.com'},
    {id: 19, firstname: 'Wallace 4', lastname: 'Silva', email: 'email4@domain.com'},
]
const postsMock = [
    {id: 1, title: 'Post 1', description: 'This is a description from post 1', slug: 'post-1', author_id: 1},
    {id: 2, title: 'Post 2', description: 'This is a description from post 2', slug: 'post-2', author_id: 1},
    {id: 3, title: 'Post 3', description: 'This is a description from post 3', slug: 'post-3', author_id: 3},
    {id: 3, title: 'Post 3', description: 'This is a description from post 3', slug: 'post-3', author_id: 3},
    {id: 4, title: 'Post 4', description: 'This is a description from post 4', slug: 'post-4', author_id: 4}
]

const schema = createSchema({
    typeDefs: `
        type User {
            id: ID!
            firstname: String!
            lastname: String!
            email: String!
            password: String!
        }
        type Post {
            id: ID!
            title: String!
            description: String!
            slug: String!
            author_id: Int!
        }
        type Author {
            firstname: String!
            lastname: String!
            posts: [Post]!
        }
        type Query {
            users: [User]!
            allPosts(page: Int!, limit: Int!): [Post]!
            author(id: Int!): Author!
        }
        type Mutation {
            createUser(firstname: String!, lastname: String!, email: String!): User!
            createPost(author_id: Int!, title: String!, description: String!): Post!
        }
    `,
    resolvers: {
        Query: {
            users: async () => {
                return usersMock;
            },
            author: async (_, {id}) => {
                const user = usersMock.find((user) => user.id === Number(id));
                const posts = postsMock.filter((post) => post.author_id === Number(id));

                return {
                    ...user,
                    posts
                }
            },
            allPosts: async (_, {page, limit}) => {
                // pagination
                const startIndex = (page - 1) * limit;
                const endIndex = startIndex + limit;

                return postsMock.slice(startIndex, endIndex);
            }
        },
        Mutation: {
            createUser: async (_, {firstname, lastname, email}) => {
                console.log(firstname, lastname, email)
                return {
                    id: 1,
                    firstname: firstname,
                    lastname: lastname,
                    email: email
                }
            },
            createPost: async (_, {author_id, title, description}) => {
                console.log(author_id, title, description);
                return {
                    id: 1,
                    title: title,
                    description: description,
                    slug: "slug",
                    author_id: author_id
                }
            }
        }
    }
});

const serverGraphQL = createYoga({schema});

export default serverGraphQL;