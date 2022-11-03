import React, { Fragment } from 'react'
import Banner from './Banner'
import ExampleCode from './ExampleCode'
import Resoureces from './Resoureces'
import RoutesInfo from './RoutesInfo'

const LandingPageIndex = () => {
  return (
    <Fragment>
      <Banner />
      <ExampleCode />
      {/* <Resoureces /> */}
      <RoutesInfo />
    </Fragment>
  )
}

export default LandingPageIndex