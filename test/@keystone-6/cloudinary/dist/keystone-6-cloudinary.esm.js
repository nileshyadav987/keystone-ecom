import _objectSpread from '@babel/runtime/helpers/esm/objectSpread2';
import _objectWithoutProperties from '@babel/runtime/helpers/esm/objectWithoutProperties';
import { jsonFieldTypePolyfilledForSQLite } from '@keystone-6/core/types';
import { graphql } from '@keystone-6/core';
import cuid from 'cuid';
import _defineProperty from '@babel/runtime/helpers/esm/defineProperty';
import cloudinary from 'cloudinary';

const _excluded$1 = ["prettyName"];
function uploadStream(stream, options) {
  return new Promise((resolve, reject) => {
    const cloudinaryStream = cloudinary.v2.uploader.upload_stream(options, (error, result) => {
      if (error || !result) {
        return reject(error);
      }
      resolve(result);
    });
    stream.pipe(cloudinaryStream);
  });
}
class CloudinaryAdapter {
  constructor(_ref) {
    let {
      cloudName,
      apiKey,
      apiSecret,
      folder
    } = _ref;
    _defineProperty(this, "cloudName", void 0);
    _defineProperty(this, "apiKey", void 0);
    _defineProperty(this, "apiSecret", void 0);
    _defineProperty(this, "folder", void 0);
    if (!cloudName || !apiKey || !apiSecret) {
      throw new Error('CloudinaryAdapter requires cloudName, apiKey, and apiSecret');
    }
    this.cloudName = cloudName;
    this.apiKey = apiKey;
    this.apiSecret = apiSecret;
    this.folder = folder || undefined;
  }

  /**
   * Params: { stream, filename, id }
   */
  save(_ref2) {
    let {
      stream,
      filename,
      id
    } = _ref2;
    // Push to cloudinary
    return uploadStream(stream, {
      public_id: id,
      folder: this.folder,
      // Auth
      api_key: this.apiKey,
      api_secret: this.apiSecret,
      cloud_name: this.cloudName
    }).then(result => ({
      // Return the relevant data for the File api
      id,
      filename,
      _meta: result
    }));
  }

  /**
   * Deletes the given file from cloudinary
   * @param file File field data
   * @param options Delete options passed to cloudinary.
   *                For available options refer to the [Cloudinary destroy API](https://cloudinary.com/documentation/image_upload_api_reference#destroy_method).
   */
  delete(file) {
    let options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    const destroyOptions = _objectSpread({
      // Auth
      api_key: this.apiKey,
      api_secret: this.apiSecret,
      cloud_name: this.cloudName
    }, options);
    return new Promise((resolve, reject) => {
      if (file) {
        // @ts-ignore
        cloudinary.v2.uploader.destroy(file._meta.public_id, destroyOptions, (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve(result);
          }
        });
      } else {
        reject(new Error("Missing required argument 'file'."));
      }
    });
  }
  publicUrl(file) {
    var _file$_meta;
    return (file === null || file === void 0 ? void 0 : (_file$_meta = file._meta) === null || _file$_meta === void 0 ? void 0 : _file$_meta.secure_url) || null;
  }
  publicUrlTransformed(file) {
    let options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    if (!file._meta) {
      return null;
    }
    const {
        prettyName
      } = options,
      transformation = _objectWithoutProperties(options, _excluded$1);
    // No formatting options provided, return the publicUrl field
    if (!Object.keys(transformation).length) {
      return this.publicUrl(file);
    }
    const {
      public_id,
      format
    } = file._meta;

    // Docs: https://github.com/cloudinary/cloudinary_npm/blob/439586eac73cee7f2803cf19f885e98f237183b3/src/utils.coffee#L472 (LOL)
    // @ts-ignore
    return cloudinary.url(public_id, {
      type: 'upload',
      format,
      secure: true,
      url_suffix: prettyName,
      transformation,
      cloud_name: this.cloudName
    });
  }
}

const _excluded = ["cloudinary"];
const CloudinaryImageFormat = graphql.inputObject({
  name: 'CloudinaryImageFormat',
  description: 'Mirrors the formatting options [Cloudinary provides](https://cloudinary.com/documentation/image_transformation_reference).\n' + 'All options are strings as they ultimately end up in a URL.',
  fields: {
    prettyName: graphql.arg({
      description: ' Rewrites the filename to be this pretty string. Do not include `/` or `.`',
      type: graphql.String
    }),
    width: graphql.arg({
      type: graphql.String
    }),
    height: graphql.arg({
      type: graphql.String
    }),
    crop: graphql.arg({
      type: graphql.String
    }),
    aspect_ratio: graphql.arg({
      type: graphql.String
    }),
    gravity: graphql.arg({
      type: graphql.String
    }),
    zoom: graphql.arg({
      type: graphql.String
    }),
    x: graphql.arg({
      type: graphql.String
    }),
    y: graphql.arg({
      type: graphql.String
    }),
    format: graphql.arg({
      type: graphql.String
    }),
    fetch_format: graphql.arg({
      type: graphql.String
    }),
    quality: graphql.arg({
      type: graphql.String
    }),
    radius: graphql.arg({
      type: graphql.String
    }),
    angle: graphql.arg({
      type: graphql.String
    }),
    effect: graphql.arg({
      type: graphql.String
    }),
    opacity: graphql.arg({
      type: graphql.String
    }),
    border: graphql.arg({
      type: graphql.String
    }),
    background: graphql.arg({
      type: graphql.String
    }),
    overlay: graphql.arg({
      type: graphql.String
    }),
    underlay: graphql.arg({
      type: graphql.String
    }),
    default_image: graphql.arg({
      type: graphql.String
    }),
    delay: graphql.arg({
      type: graphql.String
    }),
    color: graphql.arg({
      type: graphql.String
    }),
    color_space: graphql.arg({
      type: graphql.String
    }),
    dpr: graphql.arg({
      type: graphql.String
    }),
    page: graphql.arg({
      type: graphql.String
    }),
    density: graphql.arg({
      type: graphql.String
    }),
    flags: graphql.arg({
      type: graphql.String
    }),
    transformation: graphql.arg({
      type: graphql.String
    })
  }
});
const outputType = graphql.object()({
  name: 'CloudinaryImage_File',
  fields: {
    id: graphql.field({
      type: graphql.ID
    }),
    // path: types.field({ type: types.String }),
    filename: graphql.field({
      type: graphql.String
    }),
    originalFilename: graphql.field({
      type: graphql.String
    }),
    mimetype: graphql.field({
      type: graphql.String
    }),
    encoding: graphql.field({
      type: graphql.String
    }),
    publicUrl: graphql.field({
      type: graphql.String
    }),
    publicUrlTransformed: graphql.field({
      args: {
        transformation: graphql.arg({
          type: CloudinaryImageFormat
        })
      },
      type: graphql.String,
      resolve(rootVal, args) {
        return rootVal.publicUrlTransformed(args);
      }
    })
  }
});
const cloudinaryImage = _ref => {
  let {
      cloudinary
    } = _ref,
    config = _objectWithoutProperties(_ref, _excluded);
  return meta => {
    var _config$db;
    if (config.isIndexed === 'unique') {
      throw Error("isIndexed: 'unique' is not a supported option for field type cloudinaryImage");
    }
    const adapter = new CloudinaryAdapter(cloudinary);
    const inputArg = graphql.arg({
      type: graphql.Upload
    });
    const resolveInput = async uploadData => {
      if (uploadData === null) {
        return meta.provider === 'postgresql' || meta.provider === 'mysql' ? 'DbNull' : null;
      }
      if (uploadData === undefined) {
        return undefined;
      }
      const {
        createReadStream,
        filename: originalFilename,
        mimetype,
        encoding
      } = await uploadData;
      const stream = createReadStream();
      if (!stream) {
        // TODO: FIXME: Handle when stream is null. Can happen when:
        // Updating some other part of the item, but not the file (gets null
        // because no File DOM element is uploaded)
        return undefined;
      }
      const {
        id,
        filename,
        _meta
      } = await adapter.save({
        stream,
        filename: originalFilename,
        id: cuid()
      });
      return {
        id,
        filename,
        originalFilename,
        mimetype,
        encoding,
        _meta
      };
    };
    return jsonFieldTypePolyfilledForSQLite(meta.provider, _objectSpread(_objectSpread({}, config), {}, {
      input: {
        create: {
          arg: inputArg,
          resolve: resolveInput
        },
        update: {
          arg: inputArg,
          resolve: resolveInput
        }
      },
      output: graphql.field({
        type: outputType,
        resolve(_ref2) {
          let {
            value
          } = _ref2;
          if (value === null) {
            return null;
          }
          const val = value;
          return _objectSpread({
            publicUrl: adapter.publicUrl(val),
            publicUrlTransformed: _ref3 => {
              let {
                transformation
              } = _ref3;
              return adapter.publicUrlTransformed(val, transformation !== null && transformation !== void 0 ? transformation : {});
            }
          }, val);
        }
      }),
      views: '@keystone-6/cloudinary/views'
    }), {
      map: (_config$db = config.db) === null || _config$db === void 0 ? void 0 : _config$db.map
    });
  };
};

export { cloudinaryImage, outputType };
