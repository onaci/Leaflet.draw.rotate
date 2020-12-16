# leaflet-draw-rotate [![NPM version][npm-image]][npm-url] [![NPM Downloads][npm-downloads-image]][npm-url]

**ALPHA** leaflet plugin - adds rotate functionality to the [Leaflet.Draw](https://github.com/Leaflet/Leaflet.draw) plugin by binding it with a custom version of the [Leaflet.Path.Transform](https://github.com/w8r/Leaflet.Path.Transform) plugin.

![Screenshot](/screenshots/rotate.gif?raw=true)

## TODO

 - [x] Rotate rectangle
 - [ ] Rotate polygon
 - [ ] Rotate polyline
 
## Use

```javascript
// import peer dependencies
import 'leaflet';
import 'leaflet-draw';

// import plugin, then rotate bindings for each required geomtry type
import 'leaflet-draw-rotate';
import '/path/to/dist/Edit.Rectangle.Rotate.js';

// optional - configure transform options
L.Edit.Rectangle.prototype.setOptions({ uniformScaling: false });

// init leaflet-draw.. (see demo for detailed example)
```

## Options

Options should be applied via the edit handler's prototype `setOptions` function (see above example).

- **`options.handlerOptions`** - **<[Path_options](http://leafletjs.com/reference.html#path-option)>** - edge markers options
- **`options.boundsOptions`** - **<[Polyline_options](http://leafletjs.com/reference.html#polyline-option)>** - bounding rectangle options
- **`options.rotateHandleOptions`** - **<[Polyline_options](http://leafletjs.com/reference.html#polyline-option)>** - rotation handle line styles
- **`options.handleLength`** - **Int** - Length of the rotation handle in pixels. Defaults to 20.
- **`options.rotation`** - **Boolean** - Enable/disable rotation. Default `true`
- **`options.scaling`** - **Boolean** - Enable/disable scaling. Default `true`
- **`options.uniformScaling`** - **Boolean** - Use uniform scaling (maintain aspect ratio). Default `true`
- **`options.scaleRounding`** - **Int** - Decimal rounding value to use when matching non-uniform drag handles (can use this if you encounter [#5](https://github.com/onaci/Leaflet.draw.rotate/issues/5)). Default `4`

## Events

Following events are fired on the transformed layer

- **`rotatestart`, `rotate`, `rotateend`** - `{ rotation: <Radians> }`
- **`scalestart`, `scale`, `scaleend`** - `{ scale: <L.Point> }`
- **`transformstart`, `transform`, `transformed`** - `{ rotation: ..., scale: ..., matrix: <L.Matrix> }`

## Programmatic changes

If you have changed the geometry of the transformed layer and want the tool to reflect the changes, use:

```js
// you have changed the geometry here
layer.setLatLngs([...]);
// and want to update handlers:
layer.transform.reset();
```

## Development

```javascript
npm install
npm run build
```

## Thanks
This plugin builds upon earlier work of [@w8r](https://github.com/w8r) (e.g. [Leaflet.Path.Transform](https://github.com/w8r/Leaflet.Path.Transform), [Leaflet.Path.Drag](https://github.com/w8r/Leaflet.Path.Drag)), and also [@kevinsamyn's](https://github.com/kevinsamyn) work on non-skewing rectangle scaling/re-sizing.

## License
CSIRO Open Source Software Licence Agreement (variation of the BSD / MIT License)

[npm-image]: https://badge.fury.io/js/leaflet-draw-rotate.svg
[npm-url]: https://www.npmjs.com/package/leaflet-draw-rotate
[npm-downloads-image]: https://img.shields.io/npm/dt/leaflet-draw-rotate.svg
