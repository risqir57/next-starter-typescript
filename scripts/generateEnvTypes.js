const fs = require('fs');

const contents = () => {
  const env = fs.readFileSync('.env.sit', { encoding: 'ASCII' });
  const envStaging = fs.readFileSync('.env.staging', { encoding: 'ASCII' });
  const envProd = fs.readFileSync('.env.prod', { encoding: 'ASCII' });

  const envLines = env.split('\n');
  const envStagingLines = envStaging.split('\n');
  const envProdLines = envProd.split('\n');

  let filteredEnv = [];
  let filteredEnvStaging = [];
  let filteredEnvProd = [];

  // Assumption: all files have the same number of lines
  for (let index = 0; index < envLines.length; index++) {
    const envLine = envLines[index];
    const envStagingLine = envStagingLines[index];
    const envProdLine = envProdLines[index];

    if (envLine.includes('=')) {
      if (envLine.includes('#')) {
        filteredEnv.push(envLine.split('#')[1].trim());
      } else {
        filteredEnv.push(envLine.trim());
      }
    }

    if (envStagingLine.includes('=')) {
      if (envStagingLine.includes('#')) {
        filteredEnvStaging.push(envStagingLine.split('#')[1].trim());
      } else {
        filteredEnvStaging.push(envStagingLine.trim());
      }
    }

    if (envProdLine.includes('=')) {
      if (envProdLine.includes('#')) {
        filteredEnvProd.push(envProdLine.split('#')[1].trim());
      } else {
        filteredEnvProd.push(envProdLine.trim());
      }
    }
  }

  return [filteredEnv, filteredEnvProd, filteredEnvStaging];
};

const generate = () => {
  const [filteredEnv, filteredEnvProd, filteredEnvStaging] = contents();
  let envVariableNamesArray = [];
  let envVariableValuesArray = [];

  for (let i = 0; i < filteredEnv.length; i++) {
    // Assumption: the files we read are not just comments
    const envPair = filteredEnv[i].split('=');
    const envStagingValue = filteredEnvStaging[i].split('=')[1];
    const envProdValue = filteredEnvProd[i].split('=')[1];

    envVariableNamesArray.push(envPair[0]);

    envVariableValuesArray.push(envPair[1], envStagingValue, envProdValue);
  }

  // Assumption: for every name/key there are 3 values (env, env.staging, env.prod)
  let table = [];
  let valuesCursor = 0;

  for (let i = 0; i < envVariableNamesArray.length; i++) {
    table[i] = [envVariableNamesArray[i], []];

    const totalPushCount = 3;
    let current = 0;
    while (current !== totalPushCount) {
      const valueToPush = envVariableValuesArray[valuesCursor];

      if (!table[i][1].includes(valueToPush)) {
        table[i][1].push(valueToPush);
      }
      valuesCursor++;
      current++;
    }
  }
  // FIXME: delete == on XENDIT_PUBLISHABLE_KEY key
  const stringArrayMap = table.map((nameValueArray) => {
    const name = nameValueArray[0];
    const valuesArray = nameValueArray[1];

    let string = `${name}: `;

    valuesArray.forEach((value, index) => {
      if (index === 0) {
        string = string.concat(`"${value}"`);
      } else {
        string = string.concat(` | "${value}"`);
      }
    });

    return string;
  });
  const string = `
    declare global {
      namespace NodeJS {
        interface ProcessEnv {
          ${stringArrayMap.join('\n    ')}
        }
      }
    } 
    export {};
  `;

  fs.writeFileSync('environment.d.ts', string, 'utf8');
};

generate();
