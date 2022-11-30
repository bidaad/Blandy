import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { ApplicationState } from '../../../store';
import ReactGrid from '../../../components/ReactGrid';
import { stateBase } from '../../../model/general/stateBase';
import * as HCPredecessorTypeStore from '../../../store/HCPredecessorType';
import { AdminModelRequest } from '../../../model/viewModel/AdminModelRequest';
import { VwHCPredecessorType, columnStructure } from '../../../model/viewModel/VwHCPredecessorType';
 

type HCPredecessorTypeProps =
    stateBase<VwHCPredecessorType> &
    typeof HCPredecessorTypeStore.actionCreators &
    RouteComponentProps<{}> &
     {  pId: string,selectRecord: any, editable: boolean, isSelected?: boolean, valuefiltersl: string,noselectId:string  };

class HCPredecessorType extends React.PureComponent<HCPredecessorTypeProps> {

    private ensureDataFetched(pageNo: number) {
        this.getData(1, 10, '')

    }

    componentDidMount() {
        this.props.checkSecurity(this.props.history);
        this.ensureDataFetched(1);
    }


        getData = (pageNo: number, pageSize: number, filter: string,sort?: string, sortKey?: string) => {
         
        let isSelected = (this.props.isSelected === undefined) ? false : this.props.isSelected;
        const rm:AdminModelRequest={pageNo:pageNo,pageSize:pageSize,filter:filter,resourceName:"HCPredecessorType.Menu",isSelected:isSelected,sort:sort,sortKey:sortKey,parentId:this.props.pId,filtersl:this.props.valuefiltersl,noselectId:this.props.noselectId};
        this.props.requestList(rm);

    }

    deleteRecord = (id: string) => {
        this.props.deleteRecord(id);
    }

    editRecord = (id: string) => {
         this.props.ChangeTab('','HCPredecessorType','HCPredecessorTypeEdit');
        this.props.editData(id);

    }
    newRecord = () => {
         this.props.ChangeTab('','HCPredecessorType','HCPredecessorTypeEdit');
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
                            title: 'HCPredecessorType.Grid',
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
    (state: ApplicationState) => state.hcpredecessortype,
    HCPredecessorTypeStore.actionCreators
)(HCPredecessorType as any);

