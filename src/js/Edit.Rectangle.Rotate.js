/**
 * Dragging routines for poly handler
 */

L.Edit.Rectangle.include( /** @lends L.Edit.Rectangle.prototype */ {

  _transformOptions: {},

  setOptions: function(transformOptions) {
    this._transformOptions = transformOptions;
  },

  /**
   * @override
   */
  addHooks: function() {
    if (this._shape._map) {
      this._map = this._shape._map;
      this._shape.setStyle(this._shape.options.editing);
      if (!this._markerGroup) {
        this._enableRotate();
        this._enableDragging();
        this._enableScale();
        this._initMarkers();
      }
    }
  },

  /**
   * @override
   */
  removeHooks: function() {
    this._shape.setStyle(this._shape.options.original);
    if (this._shape._map) {
      this._shape._map.removeLayer(this._markerGroup);
      this._disableRotate();
      this._disableDragging();
      delete this._markerGroup;
      delete this._markers;
    }
    this._map = null;
  },

  /**
   * @override
   */
  _resize: function(latlng) {
    // Update the shape based on the current position of
    // this corner and the opposite point
    this._shape.setBounds(L.latLngBounds(latlng, this._oppositeCorner));
    this._updateMoveMarker();

    this._shape._map.fire('draw:editresize', { layer: this._shape });
  },

  /**
   * @override
   */
  _onMarkerRotateEnd: function(e) { 
    this._toggleCornerMarkers(1);
    this._repositionCornerMarkers();

    L.Edit.SimpleShape.prototype._onMarkerRotateEnd.call(this, e);
  },

  /**
   * Adds rotate listeners
   */
  _enableRotate: function() {
    if (!this._shape.transform) {
      this._shape.transform = new L.Handler.PathTransform(this._shape);
    }
    this._shape.transform.enable(this._transformOptions);
    this._shape
      .on('rotatestart', this._onStartRotateFeature, this)
      .on('rotateend', this._onStopRotateFeature, this);
  },

  /**
   * Removes rotate listeners
   */
  _disableRotate: function() { 
    this._shape.transform.disable();
    this._shape
      .off('rotatestart', this._onStartRotateFeature, this)
      .off('rotateend', this._onStopRotateFeature, this);
  },

  /**
   * Start drag
   * @param  {L.MouseEvent} evt
   */
  _onStartRotateFeature: function() {
    this._shape._map.removeLayer(this._markerGroup);
    this._shape.fire('rotate');
  },

  /**
   * Rotate stopped
   * @param  {L.MouseEvent} evt
   */
  _onStopRotateFeature: function() {
    this._fireEdit();
  },


   /* ------------------- DRAG STUFF ------------------*/
   /**
   * Adds drag start listeners
   */
  _enableDragging: function() {
    if (!this._shape.dragging) {
      this._shape.dragging = new L.Handler.PathDrag(this._shape);
    }
    this._shape.dragging.enable();
    this._shape
      .on('dragstart', this._onStartDragFeature, this)
      .on('dragend', this._onStopDragFeature, this);
  },

  /**
   * Removes drag start listeners
   */
  _disableDragging: function() {
    this._shape.dragging.disable();
    this._shape
      .off('dragstart', this._onStartDragFeature, this)
      .off('dragend', this._onStopDragFeature, this);
  },

  /**
   * Start drag
   * @param  {L.MouseEvent} evt
   */
  _onStartDragFeature: function() {
    this._shape._map.removeLayer(this._markerGroup);
    this._shape.fire('editstart');
  },

  /**
   * Dragging stopped
   * @param  {L.MouseEvent} evt
   */
  _onStopDragFeature: function() {
    this._fireEdit();
  },

  /* ------------------- SCALE (RESIZE) STUFF ------------------*/
   /**
   * Adds scale listeners
   */
  _enableScale: function() {
    this._shape
      .on('scalestart', this._onStartScaleFeature, this)
      .on('scaleend', this._onStopScaleFeature, this);
  },

  /**
   * Removes drag start listeners
   */
  _disableScale: function() {
    this._shape
      .off('scalestart', this._onStartDragFeature, this)
      .off('scaleend', this._onStopScaleFeature, this);
  },

  /**
   * Start scale
   * @param  {L.MouseEvent} evt
   */
  _onStartScaleFeature: function() {
    this._shape._map.removeLayer(this._markerGroup);
    this._shape.fire('editstart');
  },

  /**
   * Scale stopped
   * @param  {L.MouseEvent} evt
   */
  _onStopScaleFeature: function() {
    this._fireEdit();
  }
});