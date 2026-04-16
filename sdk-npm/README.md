# @korext/radar-data

SDK for querying the AI Code Radar public API.

## Install

```bash
npm install @korext/radar-data
```

## Usage

```javascript
import { radar } from '@korext/radar-data';

const current = await radar.current();
const languages = await radar.metric('languages');
const history = await radar.history('global', { days: 90 });
```

## License

Apache 2.0. Data is CC BY 4.0 (attribution required).
