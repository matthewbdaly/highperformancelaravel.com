import { Components } from "@mdx-js/react/lib";
import { MDXRemote } from "next-mdx-remote/rsc";
import { FC, ReactElement } from "react";
import Anchor from "./Anchor";
import Blockquote from "./Blockquote";
import CodeBlock from "./CodeBlock";
import Header1 from "./Header1";
import Header2 from "./Header2";
import Header3 from "./Header3";
import Info from "./Info";
import ListItem from "./ListItem";
import Paragraph from "./Paragraph";
import Pre from "./Pre";
import UnorderedList from "./UnorderedList";
import rehypePrism from 'rehype-prism-plus';
import { PageFileProps } from "../app/[slug]/page";
import { PostFileProps } from "../lib/functions";

interface Props {
  children: string,
  data: PageFileProps | PostFileProps
};

const components: Components = {
  a: Anchor,
  blockquote: Blockquote,
  code: CodeBlock,
  h1: Header1,
  h2: Header2,
  h3: Header3,
  li: ListItem,
  p: Paragraph,
  pre: Pre,
  ul: UnorderedList,
  Info,
};

const TextSection: FC<Props> = ({ children, data }): ReactElement<any> => {
  return (
    <section>
      <MDXRemote
        source={children}
        components={components}
        options={{
          scope: data as { [key: string]: unknown } & (PageFileProps | PostFileProps),
          mdxOptions: {
            remarkPlugins: [],
            rehypePlugins: [rehypePrism],
            development: process.env.NODE_ENV === "development",
            format: 'mdx'
          }
        }}
      />
    </section>
  );
};

export default TextSection;
