import { getParsedRouterDataList } from '../../router-data/parseRouterData';

import { blockRouterMetaData as CSSCascadesBlockRouterMetaData } from './SelectorsAndCascade/router-data';
import { blockRouterMetaData as blockRouterMetaDataTextFundaments } from './TextFundaments/router-data';
import { blockRouterMetaData as blockRouterMetaDataStandardTags } from './StandardTags/router-data';
import { blockRouterMetaData as blockRouterMetaDataGoogleFonts } from './GoogleFonts/router-data';
import { blockRouterMetaData as blockRouterMetaDataCssAnimations } from './CssAnimations/router-data';
import { blockRouterMetaData as blockRouterMetaDataCssColors } from './CssColors/router-data';
import { blockRouterMetaData as blockRouterMetaDataImageFiles } from './ImageFiles/router-data';
import { blockRouterMetaData as blockRouterMetaDataBackgrounds } from './Backgrounds/router-data';
import { blockRouterMetaData as blockRouterMetaDataCssFilter } from './CssFilter/router-data';
import { blockRouterMetaData as blockRouterMetaDataMediaFiles } from './MediaFiles/router-data';
import { blockRouterMetaData as blockRouterMetaDataBoxModel } from './BoxModel/router-data';
import { blockRouterMetaData as blockRouterMetaDataHtmlTables } from './HtmlTables/router-data';
import { blockRouterMetaData as blockROuterMetaDataTablesTennis } from './TablesTennis/router-data';
import { blockRouterMetaData as blockRouterMetaDataArrayRendering } from './ArrayRendering/router-data';
import { blockRouterMetaData as blockRouterMetaDataArrayRenderToTable } from './ArrayRenderToTable/router-data';
import { blockRouterMetaData as blockRouterMetaDataFloatsAndPositioning } from './FloatsAndPositioning/router-data';
import { blockRouterMetaData as blockRouterMetaDataFloatsAndPositioningExercise } from './FloatsAndPositioningExercise/router-data';
import { blockRouterMetaData as blockRouterMetaDataResponsiveWebDesign } from './RWD/router-data';

export const blockRouterMetaData = [
  CSSCascadesBlockRouterMetaData,
  blockRouterMetaDataTextFundaments,
  blockRouterMetaDataStandardTags,
  blockRouterMetaDataGoogleFonts,
  blockRouterMetaDataCssAnimations,
  blockRouterMetaDataCssColors,
  blockRouterMetaDataImageFiles,
  blockRouterMetaDataBackgrounds,
  blockRouterMetaDataCssFilter,
  blockRouterMetaDataMediaFiles,
  blockRouterMetaDataBoxModel,
  blockRouterMetaDataHtmlTables,
  blockROuterMetaDataTablesTennis,
  blockRouterMetaDataArrayRendering,
  blockRouterMetaDataArrayRenderToTable,
  blockRouterMetaDataFloatsAndPositioning,
  blockRouterMetaDataFloatsAndPositioningExercise,
  blockRouterMetaDataResponsiveWebDesign,
];
export const blockRouterData = getParsedRouterDataList(blockRouterMetaData);
