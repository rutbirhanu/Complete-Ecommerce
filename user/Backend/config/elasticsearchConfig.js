const { Client } = require("@elastic/elasticsearch");

const elasticClient = new Client({
  node: "http://localhost:9200",
//   auth: {
//     username: "elastic",
//     password: "your-password-here" // optional for local dev if disabled
//   }
});


async function checkConnection() {
  try {
    const health = await elasticClient.cluster.health();
    console.log("Elasticsearch cluster health:", health.status);
  } catch (error) {
    console.error("Elasticsearch connection failed:", error);
  }
}



async function createProductIndex() {
  const indexExists = await elasticClient.indices.exists({ index: "products" });

  if (!indexExists) {
    await elasticClient.indices.create({
      index: "products",
      body: {
        mappings: {
          properties: {
            name: { type: "text" },
            description: { type: "text" },
            price: { type: "float" },
            category: { type: "keyword" },
            stock: { type: "integer" }
          }
        }
      }
    });

    console.log("✅ Created 'products' index in Elasticsearch");
  }
}



module.exports = {elasticClient, checkConnection, createProductIndex};
