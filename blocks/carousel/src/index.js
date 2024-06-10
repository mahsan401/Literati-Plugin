import { registerBlockType } from '@wordpress/blocks';
import { InspectorControls } from '@wordpress/block-editor';
import { PanelBody, RangeControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { useState, useEffect } from '@wordpress/element';
import apiFetch from '@wordpress/api-fetch';

import './style.scss';
import Edit from './edit';
import metadata from './block.json';

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
            apiFetch({ path: '/wp/v2/posts?per_page=100&post_type=promotion' }).then((posts) => {
                setPosts(posts);
            });
        }, []);
console.log(posts);
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
                <div>
                    <p>{__('Promotion Carousel', 'my-promotion-plugin')}</p>
                    <p>{__('Transition Time: ', 'my-promotion-plugin')}{transitionTime}{__(' seconds', 'my-promotion-plugin')}</p>
                    <ul>
                        {posts.map((post) => (
                            <li key={post.id}>{post.title.rendered}</li>
                        ))}
                    </ul>
                </div>
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
    }
});