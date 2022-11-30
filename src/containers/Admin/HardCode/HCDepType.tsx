import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { ApplicationState } from '../../../store';
import ReactGrid from '../../../components/ReactGrid';
import { stateBase } from '../../../model/general/stateBase';
import * as HCDepTypeStore from '../../../store/HCDepType';
import { AdminModelRequest } from '../../../model/viewModel/AdminModelRequest';
import { VwHCDepType, columnStructure } from '../../../model/viewModel/VwHCDepType';
 
//var CSSTransitionGroup = require('react-transition-group/CSSTransition')


type HCDepTypeProps =
    stateBase<VwHCDepType> &
    typeof HCDepTypeStore.actionCreators &
    RouteComponentProps<{}> &
    {  pId: string,selectRecord: any, editable: boolean, isSelected?: boolean, valuefiltersl: string,noselectId:string,typeForm:string  };

class HCDepType extends React.PureComponent<HCDepTypeProps> {


    private ensureDataFetched(pageNo: number) {
        this.getData(1, 10, '')

    }

    componentDidMount() {
        this.props.checkSecurity(this.props.history);
        this.ensureDataFetched(1);
    }

    
            getData = (pageNo: number, pageSize: number, filter: string,sort?: string, sortKey?: string) => {
         
        let isSelected = (this.props.isSelected === undefined) ? false : this.props.isSelected;
        const rm:AdminModelRequest={pageNo:pageNo,pageSize:pageSize,filter:filter,resourceName:"HCDepType.Menu",isSelected:isSelected,sort:sort,sortKey:sortKey,parentId:this.props.pId,filtersl:this.props.valuefiltersl,noselectId:this.props.noselectId};
        this.props.requestList(rm);

    }

    deleteRecord = (id: string) => {
        this.props.deleteRecord(id);
    }

    editRecord = (id: string) => {
        this.props.ChangeTab('','HCDepType','EditHCDepType');
        this.props.editData(id);

    }
    newRecord = () => {
        this.props.ChangeTab('','HCDepType','EditHCDepType');
        this.props.editData();
    }
    selectRecord = (id: string, selectedColumns: string) => {
        if (this.props.selectRecord !== undefined)
            this.props.selectRecord(id, selectedColumns);
    }

    public render() {

        return (

            <React.Fragment>
                    <div key={1}>

   <ReactGrid
   {
   ...{
       title: 'HCDepType.Grid',
       columns: columnStructure,
       editable: true,
       data: this.props.models,
       count: this.props.count,
       getData: this.getData,
       deleteRecord: this.deleteRecord,
       filter: this.props.filter,
       editRecord: this.editRecord,
       selectRecord: this.selectRecord,
       pageSize: this.props.pageSize,
       pageNo: this.props.pageNo,
       newRecord: this.newRecord,
       
       internalLoading: this.props.isLoading,
                            
                            sort: this.props.sort,
   }
   }

/>

                     
                    </div>
            </React.Fragment>

        );
    }
};


export default connect(
    (state: ApplicationState) => state.hcdeptype,
    HCDepTypeStore.actionCreators
)(HCDepType as any);

