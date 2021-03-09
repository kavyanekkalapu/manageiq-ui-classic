import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import UtilizationDonutChart from './utilizationDonutChart';
import UtilizationMemoryDonutChart from './utilizationMemoryDonutChart';
import { chartConfig } from '../charts_config';
import { http } from '../../../http_api';

const UtilizationChartGraph = ({
  providerId, title, cpuConfig, memoryConfig, dashboard,
}) => {
  const [data, setCardData] = useState({ loading: true });

  useEffect(() => {
    const url = `/${dashboard}/ems_utilization_data/${providerId}`;
    http.get(url)
      .then((response) => {
        setCardData({
          loading: false,
          metricsData: response.data.ems_utilization,
        });
      });
  }, []);

  if (data.loading) return null;

  return (
    <div className="card-pf card-pf-utilization">
      <div className="card-pf-heading">
        <h2 className="card-pf-title">{title}</h2>
      </div>
      <div className="card-pf-body">
        <div className="row">
          <div className="col-xs-12 col-sm-12 col-md-12 col-lg-6 example-trend-container">
            <UtilizationDonutChart data={data.metricsData} config={chartConfig[cpuConfig]} />
          </div>
          <div className="col-xs-12 col-sm-12 col-md-12 col-lg-6 example-trend-container">
            <UtilizationMemoryDonutChart data={data.metricsData} config={chartConfig[memoryConfig]} />
          </div>
        </div>
      </div>
    </div>
  );
};

UtilizationChartGraph.propTypes = {
  providerId: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  cpuConfig: PropTypes.string.isRequired,
  memoryConfig: PropTypes.string.isRequired,
  dashboard: PropTypes.string.isRequired,
};

export default UtilizationChartGraph;
