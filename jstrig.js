"use strict";
exports.__esModule = true;
var jstrig;
(function () {
    var Trig = /** @class */ (function () {
        function Trig() {
            this.OrbitType = {
                COS: 'cos',
                SIN: 'sin'
            };
        }
        Trig.prototype.distance = function (point1, point2) {
            var distx = point2.x - point1.x;
            var disty = point2.y - point1.y;
            return Math.sqrt(Math.pow(distx, 2) + Math.pow(disty, 2));
        };
        Trig.prototype.angle = function (point1, point2) {
            var distx = point2.x - point1.x;
            var disty = point2.y - point1.y;
            var masterdist = this.distance(point1, point2);
            var primary_anglex = distx / masterdist;
            var anglex = Math.asin(primary_anglex) * 180 / Math.PI;
            var primary_angley = disty / masterdist;
            var angley = Math.asin(primary_angley) * 180 / Math.PI;
            var resultVal;
            if (disty < 0) {
                resultVal = anglex;
            }
            else if (disty >= 0 && distx >= 0) {
                resultVal = angley + 90;
            }
            else if (disty >= 0 && distx < 0) {
                resultVal = (angley * -1) - 90;
            }
            return resultVal;
        };
        Trig.prototype.orbit = function (_center, _radius, _angle, orbitType) {
            var resultVal;
            if (orbitType == this.OrbitType.COS) {
                resultVal = _center + (Math.cos(this.degreesToRadians(_angle - 90)) * _radius);
            }
            if (orbitType == this.OrbitType.SIN) {
                resultVal = _center + (Math.sin(this.degreesToRadians(_angle - 90)) * _radius);
            }
            return resultVal;
        };
        Trig.prototype.degreesToRadians = function (deg) {
            return deg * (Math.PI / 180);
        };
        Trig.prototype.radiansToDegrees = function (rad) {
            return rad * (180 / Math.PI);
        };
        Trig.prototype.intersection = function (_tl, _tr, _br, _bl) {
            var a1 = _br.y - _tl.y;
            var b1 = _tl.x - _br.x;
            var a2 = _bl.y - _tr.y;
            var b2 = _tr.x - _bl.x;
            var denom = a1 * b2 - a2 * b1;
            //alert(_br.y);
            //if (denom == 0) return null;
            var c1 = _br.x * _tl.y - _tl.x * _br.y;
            var c2 = _bl.x * _tr.y - _tr.x * _bl.y;
            var p = { x: (b1 * c2 - b2 * c1) / denom, y: (a2 * c1 - a1 * c2) / denom };
            //if (getDistance(p, _br) > getDistance(_tl, _tr)) return null;
            //if (getDistance(p, _tl) > getDistance(_tl, _tr)) return null;
            //if (getDistance(p, _bl) > getDistance(_br, _bl)) return null;
            //if (getDistance(p, _tr) > getDistance(_br, _bl)) return null;
            return p;
        };
        Trig.prototype.inside = function (point, shapePoints) {
            // ray-casting algorithm based on
            // http://www.ecse.rpi.edu/Homepages/wrf/Research/Short_Notes/pnpoly.html
            var x = point.x;
            var y = point.y;
            var vs = shapePoints;
            var inside = false;
            for (var i = 0, j = vs.length - 1; i < vs.length; j = i++) {
                var xi = vs[i].x, yi = vs[i].y;
                var xj = vs[j].x, yj = vs[j].y;
                var intersect = ((yi > y) != (yj > y))
                    && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
                if (intersect)
                    inside = !inside;
            }
            return inside;
        };
        return Trig;
    }());
    jstrig = new Trig();
})();
exports["default"] = jstrig;
