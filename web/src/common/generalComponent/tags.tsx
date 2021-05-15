import React, { useEffect, useState } from 'react';

import * as Module from './tags.style';

const Tags = (props: any) => {
    const [tags, setTags] = useState<Array<string>>([]);

    const addTags = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (
            e.key === 'Enter' &&
            e.currentTarget.value !== '' &&
            !tags.includes(e.currentTarget.value) &&
            tags.length <= 5 &&
            e.currentTarget.value.length <= 15
        ) {
            const currentTags = [...tags, e.currentTarget.value];
            setTags(currentTags);
            props.setValue('tags', currentTags, {
                shouldValidate: true,
                shouldDirty: true
            });
            e.currentTarget.value = '';
        }
    };

    const removeTags = (index: number) => {
        setTags([...tags.filter((tag) => tags.indexOf(tag) !== index)]);
    };

    const init = () => {
        props.tag && props.tag.forEach((x:any) => {
            !tags.includes(x) && setTags([...tags, x]);
        })
    }

    init();

    return (
        <Module.TagInput>
            <Module.Tag>
                {tags.map((tag, index) => (
                    <li key={index}>
                        <span>{tag}</span>
                        <Module.CloseIcon onClick={() => removeTags(index)}>
                            <Module.StyledCloseIcon />
                        </Module.CloseIcon>
                    </li>
                ))}
            </Module.Tag>
            <input onKeyUp={(event) => addTags(event)} />
        </Module.TagInput>
    );
};

export default Tags;
