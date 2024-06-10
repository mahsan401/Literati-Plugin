import { registerBlockType } from '@wordpress/blocks';
import { InspectorControls } from '@wordpress/block-editor';
import { PanelBody, RangeControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { useState, useEffect } from '@wordpress/element';
import apiFetch from '@wordpress/api-fetch';
import './style.scss';
import metadata from './block.json';

const Carousel = ({ posts, transitionTime }) => {
  return (
    <div
      id="myCarousel"
      className="carousel slide"
      data-ride="carousel"
      data-interval={transitionTime * 1000}
    >
      <div className="carousel-inner">
        {posts.length > 0 ? (
          posts.map((post, index) => (
            <div
              className={`carousel-item ${index === 0 ? 'active' : ''}`}
              key={post.id}
            >
              <div className="row">
                <div className="col-md-4">
                  <div className="carousel-caption d-block">
                    <h5>{__('My Headline', 'my-promotion-plugin')}</h5>
                    <p dangerouslySetInnerHTML={{ __html: post.content.rendered }} />
                    <a href={post.link} className="btn btn-primary">
                      {__('Read More', 'my-promotion-plugin')}
                    </a>
                  </div>
                </div>
                <div className="col-md-4">
                  <img
                    src="https://via.placeholder.com/300" // Replace this with your image source
                    className="d-block w-100"
                    alt="Promotion Image"
                  />
                </div>
                <div className="col-md-4">
                  <div className="carousel-caption d-block">
                    <h5>{__('My Headline', 'my-promotion-plugin')}</h5>
                    <p dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }} />
                    <a href={post.link} className="btn btn-primary">
                      {__('Read More', 'my-promotion-plugin')}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>{__('No posts found', 'my-promotion-plugin')}</p>
        )}
      </div>
      <a
        className="carousel-control-prev"
        href="#myCarousel"
        role="button"
        data-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="sr-only">{__('Previous', 'my-promotion-plugin')}</span>
      </a>
      <a
        className="carousel-control-next"
        href="#myCarousel"
        role="button"
        data-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="sr-only">{__('Next', 'my-promotion-plugin')}</span>
      </a>
    </div>
  );
};

registerBlockType('my-promotion-plugin/carousel', {
  title: __('Promotion Carousel', 'my-promotion-plugin'),
  icon: 'slides',
  category: 'widgets',
  attributes: {
    transitionTime: {
      type: 'number',
      default: 5,
    },
  },
  edit: ({ attributes, setAttributes }) => {
    const { transitionTime } = attributes;
    const [posts, setPosts] = useState([]);

    useEffect(() => {
      apiFetch({ path: '/wp/v2/posts?per_page=100&post_type=promotion' }).then(
        (posts) => {
          setPosts(posts);
        }
      );
    }, []);

    return (
      <>
        <InspectorControls>
          <PanelBody title={__('Carousel Settings', 'my-promotion-plugin')}>
            <RangeControl
              label={__('Transition Timer (seconds)', 'my-promotion-plugin')}
              value={transitionTime}
              onChange={(value) => setAttributes({ transitionTime: value })}
              min={1}
              max={60}
            />
          </PanelBody>
        </InspectorControls>
        <Carousel posts={posts} transitionTime={transitionTime} />
      </>
    );
  },
  save: ({ attributes }) => {
    const { transitionTime } = attributes;
    return (
      <div data-transition-time={transitionTime}>
        {__('Promotion Carousel', 'my-promotion-plugin')}
      </div>
    );
  },
});
