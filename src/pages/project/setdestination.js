var types = require('../../components/basic-element/basic-element.jsx').types;
var api = require('../../lib/api');
var reportError = require('../../lib/errors');
var dispatcher = require('../../lib/dispatcher');

module.exports = {
  componentDidMount: function () {
    // Handle button actions
    dispatcher.on('linkClicked', (event) => {
      if (event.props.targetPageId && this.state.isPageZoomed) {
        this.zoomToPage( this.pageIdToCoords(event.props.targetPageId) );
      } else {
        this.highlightPage(event.props.targetPageId, 'selected');
      }
    });
  },

  setDestination: function () {
    var patchedState = this.state.routeData.linkState;

    patchedState = types.link.spec.expand(patchedState);

    // Patch old attributes object to prevent overwritten properties
    patchedState.attributes.targetPageId = this.state.selectedEl;
    patchedState.attributes.targetProjectId = this.state.params.project;
    patchedState.attributes.targetUserId = this.state.params.user;

    this.setState({loading: true});
    api({
      method: 'patch',
      uri: `/users/${this.state.routeData.userID}/projects/${this.state.routeData.projectID}/pages/${this.state.routeData.pageID}/elements/${this.state.routeData.elementID}`,
      json: {
        attributes: patchedState.attributes
      }
    }, (err, data) => {
      this.setState({loading: false});
      if (err) {
        reportError('There was an error updating the element', err);
      }

      if (window.Platform) {
        window.Platform.goBack();
      }
    });
  }
};
