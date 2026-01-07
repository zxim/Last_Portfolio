import React from 'react';
import styled from 'styled-components';
import { AwsIcon, BurpsuiteIcon, ElkIcon, GitIcon, JavascriptIcon, KaliLinuxIcon, MariadbIcon, MysqlIcon, NextjsIcon, NodejsIcon, PhpIcon, PythonIcon, SuricataIcon, UbuntuIcon, WiresharkIcon, AndroidStudioIcon, AnsibleIcon, ApacheIcon, ArCoreIcon, DockerIcon, FlaskIcon, HtmlIcon, JavaIcon, MongodbIcon, OpencvIcon, ReactIcon, RedhatIcon, ShellScriptIcon, SpringBootIcon, TerraformIcon, TypescriptIcon } from '@/components/Section/ProjectsSection/ProjectsList/Project/StackIcons';

interface StackIconsType {
  [key: string]: React.ElementType;
}

const stackIcons: StackIconsType = {
  'Next.js': NextjsIcon,
  TypeScript: TypescriptIcon,
  MongoDB: MongodbIcon,
  AWS: AwsIcon,
  'Suricata (IPS)': SuricataIcon,
  'ELK (SIEM)': ElkIcon,
  PHP: PhpIcon,
  'Kali Linux': KaliLinuxIcon,
  Ubuntu: UbuntuIcon,
  Wireshark: WiresharkIcon,
  Git: GitIcon,
  JavaScript: JavascriptIcon,
  'HTML/CSS': HtmlIcon,
  Apache: ApacheIcon,
  MySQL: MysqlIcon,
  'Burp Suite': BurpsuiteIcon,
  Terraform: TerraformIcon,
  Docker: DockerIcon,
  Ansible: AnsibleIcon,
  RedHat: RedhatIcon,
  'Shell Script': ShellScriptIcon,
  'MariaDB': MariadbIcon,
  'Spring Boot': SpringBootIcon,
  'Node.js': NodejsIcon,
  'Android Studio': AndroidStudioIcon,
  Java: JavaIcon,
  Python: PythonIcon,
  ARCore: ArCoreIcon,
  OpenCV: OpencvIcon,
  React: ReactIcon,
  Flask: FlaskIcon,
};

const ProjectStacksContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5em;
`;

const StackItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.2em;
  padding: 0.3em 0.6em;
  border-radius: 4px;
  background-color: #f0f0f0;
  font-size: 0.9em;
  color: #000; /* Set text color to black */
  border: 1px solid #ccc; /* Add a visible border */
`;

interface ProjectStacksProps {
  stacks: string[];
}

const ProjectStacks = ({ stacks }: ProjectStacksProps) => {
  return (
    <ProjectStacksContainer>
      {stacks.map((stackName) => {
        const IconComponent = stackIcons[stackName];
        if (IconComponent) {
          return (
            <StackItem key={stackName}>
              <IconComponent />
              <span>{stackName}</span>
            </StackItem>
          );
        } else if (IconComponent === null) {
          return (
            <StackItem key={stackName}>
              <span>{stackName}</span>
            </StackItem>
          );
        }
        return null;
      })}
    </ProjectStacksContainer>
  );
};

export default ProjectStacks;