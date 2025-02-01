import { Memory } from '@mastra/memory';
import { PgVector } from '@mastra/vector-pg';
import { MastraStorageLibSql } from '@mastra/core';


export const memory = new Memory({
  // Required: Storage backend for messages
  storage: new MastraStorageLibSql({
    config: {
      url: 'file:example.db',
    },
  }),
  
  // Optional: Thread configuration
  threads: {
    // Number of recent messages to include (false to disable)
    injectRecentMessages: 10,
    
    // Vector search configuration
    injectVectorHistorySearch: {
      includeResults: 3,  // Number of semantic search results
      includePrevious: 2, // Messages before each result
      includeNext: 2,     // Messages after each result
    },
  },
  
  // Optional: Vector store for semantic search
  // vector: new PgVector(connectionString),
  // embeddingOptions: {
  //   provider: 'OPEN_AI',
  //   model: 'text-embedding-ada-002',
  //   maxRetries: 3,
  // },
});