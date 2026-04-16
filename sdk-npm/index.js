const BASE_URL = 'https://oss.korext.com/api/radar';

class RadarAPIError extends Error {
  constructor(status, message) {
    super(message);
    this.name = 'RadarAPIError';
    this.status = status;
  }
}

async function request(path) {
  const res = await fetch(`${BASE_URL}${path}`);
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new RadarAPIError(res.status, body.error || `Request failed with status ${res.status}`);
  }
  return res.json();
}

class RadarAPI {
  /**
   * Returns the full current aggregated snapshot.
   */
  async current() {
    return request('/current');
  }

  /**
   * Returns a specific metric dimension from the current snapshot.
   * Valid metrics: languages, tools, ecosystems, industries, regions, governance, maturity
   */
  async metric(metricName) {
    return request(`/current?metric=${encodeURIComponent(metricName)}`);
  }

  /**
   * Returns time series history for a metric.
   * @param {string} metricName
   * @param {object} options
   * @param {number} options.days Number of days of history (1 to 365)
   */
  async history(metricName, options = {}) {
    const days = options.days || 30;
    return request(`/history?metric=${encodeURIComponent(metricName)}&days=${days}`);
  }

  /**
   * Returns a historical snapshot by timestamp.
   * @param {string} date Format: YYYY-MM-DD-HH
   */
  async snapshot(date) {
    return request(`/snapshot/${encodeURIComponent(date)}`);
  }

  /**
   * Returns the methodology document as markdown.
   */
  async methodology() {
    return request('/methodology');
  }
}

const radar = new RadarAPI();

module.exports = { radar, RadarAPI, RadarAPIError };
