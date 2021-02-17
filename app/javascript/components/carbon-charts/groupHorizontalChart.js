import React from 'react';
import PropTypes from 'prop-types';
import { GroupedBarChart } from '@carbon/charts-react';

const GroupHorizontalBarChart = ({ data }) => {
  const options = {
    axes: {
      left: {
        scaleType: 'labels',
        mapsTo: 'key',
      },
      bottom: {
        mapsTo: 'value',
      },
    },
    height: '400px',
  };

  return (
    <GroupedBarChart data={data} options={options} />
  );
};

GroupHorizontalBarChart.propTypes = {
  data: PropTypes.array,
};

GroupHorizontalBarChart.defaultProps = {
  data: null,
};

export default GroupHorizontalBarChart;
