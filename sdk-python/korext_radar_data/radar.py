import requests

BASE_URL = "https://oss.korext.com/api/radar"


class RadarAPIError(Exception):
    """Raised when the API returns a non-200 response."""
    def __init__(self, status_code, message):
        self.status_code = status_code
        self.message = message
        super().__init__(f"RadarAPIError ({status_code}): {message}")


def _request(path):
    resp = requests.get(f"{BASE_URL}{path}")
    if not resp.ok:
        body = resp.json() if resp.headers.get("content-type", "").startswith("application/json") else {}
        raise RadarAPIError(resp.status_code, body.get("error", f"Request failed with status {resp.status_code}"))
    return resp.json()


class RadarAPI:
    """SDK for querying the AI Code Radar public API."""

    def current(self):
        """Returns the full current aggregated snapshot."""
        return _request("/current")

    def metric(self, metric_name):
        """Returns a specific metric dimension.

        Valid metrics: languages, tools, ecosystems, industries,
        regions, governance, maturity
        """
        return _request(f"/current?metric={metric_name}")

    def history(self, metric_name, days=30):
        """Returns time series history for a metric.

        Args:
            metric_name: The metric to query.
            days: Number of days of history (1 to 365).
        """
        return _request(f"/history?metric={metric_name}&days={days}")

    def snapshot(self, date_str):
        """Returns a historical snapshot by timestamp.

        Args:
            date_str: Format YYYY-MM-DD-HH (e.g. 2026-04-15-12)
        """
        return _request(f"/snapshot/{date_str}")

    def methodology(self):
        """Returns the methodology document as markdown."""
        return _request("/methodology")


radar = RadarAPI()
