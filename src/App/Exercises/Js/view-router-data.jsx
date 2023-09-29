import { getParsedRouterDataList } from '../../router-data/parseRouterData';

import { blockRouterMetaData as blockRouterMetaDataBooleans } from './Booleans/router-data';
import { blockRouterMetaData as blockRouterMetaDataIfSwitch } from './IfSwitch/router-data';
import { blockRouterMetaData as blockRouterMetaDataNumbers } from './Numbers/router-data';
import { blockRouterMetaData as blockRouterMetaDataJsNumbersTraining } from './JsNumbersTraining/router-data';
import { blockRouterMetaData as blockRouterMetaDataComplexTypesInJs } from './ComplexTypesInJs/router-data';
import { blockRouterMetaData as blockRouterMetaDataJsFunctionBasics } from './JsFunctionBasics/router-data';
import { blockRouterMetaData as blockRouterMetaDataBlock22Warmup } from './Block22Warmup/router-data';
import { blockRouterMetaData as blockRouterMetaDataSetTimeout } from './SetTimeout/router-data';
import { blockRouterMetaData as blockRouterMetaDataVanishString } from './VanishString/router-data';
import { blockRouterMetaData as blockRouterMetaDataHitTheMoleGame } from './HitTheMoleGame/router-data';
import { blockRouterMetaData as blockRouterMetaDataMemoGame } from './MemoGame/router-data';
import { blockRouterMetaData as blockRouterMetaDataJsPrototypes } from './JsPrototypes/router-data';
import { blockRouterMetaData as blockRouterMetaDataObjectOrientedProgramming } from './ObjectOrientedProgramming/router-data';
import { blockRouterMetaData as blockRouterMetaDataObjectOrientedProgrammingExercises } from './ObjectOrientedProgrammingExercises/router-data';
import { blockRouterMetaData as blockRouterMetaDataJsonXmlStorage } from './JsonXmlStorage/router-data';
import { blockRouterMetaData as blockRouterMetaDataSavedInput } from './SavedInput/router-data';
import { blockRouterMetaData as blockRouterMetaDataPromisesAndMe } from './PromisesAndMe/router-data';
import { blockRouterMetaData as blockRouterDataUseEffectAndPromiseExercise } from './UseEffectAndPromiseExercise/router-data';
import { blockRouterMetaData as blockRouterDataAsyncAndAwait } from './AsyncAndAwait/router-data';

export const blockRouterMetaData = [
  blockRouterMetaDataBooleans,
  blockRouterMetaDataIfSwitch,
  blockRouterMetaDataNumbers,
  blockRouterMetaDataJsNumbersTraining,
  blockRouterMetaDataComplexTypesInJs,
  blockRouterMetaDataJsFunctionBasics,
  blockRouterMetaDataBlock22Warmup,
  blockRouterMetaDataSetTimeout,
  blockRouterMetaDataVanishString,
  blockRouterMetaDataHitTheMoleGame,
  blockRouterMetaDataMemoGame,
  blockRouterMetaDataJsPrototypes,
  blockRouterMetaDataObjectOrientedProgramming,
  blockRouterMetaDataObjectOrientedProgrammingExercises,
  blockRouterMetaDataJsonXmlStorage,
  blockRouterMetaDataSavedInput,
  blockRouterMetaDataPromisesAndMe,
  blockRouterDataUseEffectAndPromiseExercise,
  blockRouterDataAsyncAndAwait,
];
export const blockRouterData = getParsedRouterDataList(blockRouterMetaData);
