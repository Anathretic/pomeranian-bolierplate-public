import { getParsedRouterDataList } from '../../router-data/parseRouterData';

import { SubRouteExampleMetaData } from './SubRouteExample/router-data';
import { ReactEventsUseStateMetaData } from './ReactEventsUseState/router-data';
import { ReactIfStatementsMetaData } from './ReactIfStatements/router-data';
import { ReactIfStatementsMoreOrLessMetaData } from './ReactIfStatementsMoreOrLess/router-data';
import { ReactTryCatchAndFinallyMetaData } from './TryCatchAndFinally/router-data';

export const blockRouterMetaData = [
  SubRouteExampleMetaData,
  ReactEventsUseStateMetaData,
  ReactIfStatementsMetaData,
  ReactIfStatementsMoreOrLessMetaData,
  ReactTryCatchAndFinallyMetaData,
];
export const blockRouterData = getParsedRouterDataList(blockRouterMetaData);
