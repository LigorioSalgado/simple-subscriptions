const { GraphQLServer, PubSub } = require('graphql-yoga');
let nextId = 0;
let comments = []

const ADD_NEW_COMMENT = "newComment";

const typeDefs = `
  type Query {
	hello: String!
	comments:[Comment!]!
  }
  type Mutation {
	addComment(text:String!):Comment!
  }
  type Comment {
	id:Int!
	text:String!
  }

  type Subscription {
    newComment: Comment!
  }

`

const resolvers = {
  Query: {
	hello: () => `Hello`,
	comments:() => comments
  },
  Mutation: {
	addComment:(parent,args,{pubsub}) => {  // (parent,args,context,info)
		const newComment = { id: nextId++, text: args.text };
		comments.push(newComment);
		pubsub.publish(ADD_NEW_COMMENT,{newComment:newComment});
		return newComment;
	}
  },
  Subscription: {
    newComment: {
      subscribe: (parent, args, { pubsub }) => {
        
        return pubsub.asyncIterator(ADD_NEW_COMMENT)
      },
    }
  },
}

const pubsub = new PubSub()
const server = new GraphQLServer({ typeDefs, resolvers, context: { pubsub } })

const options = {
	port: 4000,
	endpoint: '/graphql',
	playground: '/',
	cors:{
		origin:"*"
		//origin:process.env.HOSTS.split(',') // "http://localhost:3000,https://misite.com....."
	}
  };


server.start(options,() => console.log('Server is running on localhost:4000'))
