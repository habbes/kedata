export default HeaderController;

function HeaderController($scope, DataService){
    
    this.refreshing = false;
    this.refreshData = refreshData;
    
    function refreshData(){
        this.refreshing = true;
        DataService.refreshData()
        .then(data => {
            this.refreshing = false;
            try {
                $scope.$apply();
            } catch (e) {}
        });
    }
    
}