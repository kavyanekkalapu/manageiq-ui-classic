import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import UsageAreaChart from './usageAreaChart';
import { http } from '../../../http_api';
import { chartConfig } from '../charts_config';

const UsageTrendChart = ({
  providerId, config, apiUrl, dataPoint,
}) => {
  const [data, setCardData] = useState({ loading: true });

  useEffect(() => {
    const url = `/${apiUrl}/${providerId}`;
    http.get(url)
      .then((response) => {
        setCardData({
          loading: false,
          vms: response.data,
        });
      });
  }, []);
  if (data.loading) return null;
  const resultData = data.vms;
  const configName = resultData[dataPoint].interval_name + config;
  return (
    <div className="card-pf card-pf-utilization">
      <div className="card-pf-heading">
        <h2 className="card-pf-title">{chartConfig[configName].headTitle}</h2>
      </div>
      <div className="card-pf-body">
        <UsageAreaChart data={data.vms} config={chartConfig[configName]} dataPoint={dataPoint} />
      </div>
    </div>
  );
};

UsageTrendChart.propTypes = {
  providerId: PropTypes.string.isRequired,
  config: PropTypes.string.isRequired,
  apiUrl: PropTypes.string.isRequired,
  dataPoint: PropTypes.string.isRequired,
};

export default UsageTrendChart;
