const { runAggregator } = require('./aggregator');

/**
 * Basic scheduler to loop the aggregation pipeline.
 * In production this runs as a scheduled container task.
 * Locally this just runs the aggregator once or loops for test dev.
 */

async function start() {
  console.log("Starting AI Code Radar Scheduler");
  
  // Single pass for local testing
  await runAggregator();

  console.log("Scheduler task completed.");
}

if (require.main === module) {
  start().catch(console.error);
}
