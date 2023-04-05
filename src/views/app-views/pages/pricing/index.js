import React from 'react'
import { Grid} from 'antd';
import { pricingData } from './pricingData';
import utils from 'utils'

const { useBreakpoint } = Grid;

const Pricing = () => {
	const isMobile = !utils.getBreakPoint(useBreakpoint()).includes('lg')
	const colCount = pricingData.length
	console.log('isMobile', isMobile)
	return (
		<>
		<h1>Pricing</h1>
		</>
	)
}

export default Pricing

